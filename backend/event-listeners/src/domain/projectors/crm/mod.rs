use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use chrono::{NaiveDateTime, Utc};
use domain::{
	BudgetEvent, Event, GithubRepositoryId, GithubService, PaymentEvent, ProjectEvent,
	SubscriberCallbackError,
};
use tracing::instrument;

use crate::{
	domain::{CrmGithubRepo, EventListener},
	infrastructure::database::CrmGithubRepoRepository,
};

pub struct Projector {
	crm_github_repo_repository: CrmGithubRepoRepository,
	github_service: Arc<dyn GithubService>,
}

impl Projector {
	pub fn new(
		crm_github_repo_repository: CrmGithubRepoRepository,
		github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			crm_github_repo_repository,
			github_service,
		}
	}

	async fn upsert_crm_github_repo(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), SubscriberCallbackError> {
		let existing_crm_github_repo =
			self.crm_github_repo_repository.find_by_id(github_repo_id).unwrap_or_default();

		if existing_crm_github_repo.updated_at().map_or(true, |time: NaiveDateTime| {
			(Utc::now().naive_utc() - time).num_seconds() > 60
		}) {
			let repo = self.github_service.repo_by_id(github_repo_id).await?;

			self.crm_github_repo_repository.upsert(&CrmGithubRepo::new(
				*github_repo_id,
				repo.owner().clone(),
				repo.name().clone(),
				Some(Utc::now().naive_utc()),
			))?;
		}
		Ok(())
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "crm_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::GithubRepoLinked { github_repo_id, .. } => {
					self.upsert_crm_github_repo(github_repo_id).await?;
				},
				ProjectEvent::Budget {
					event:
						BudgetEvent::Payment {
							event: PaymentEvent::Requested { reason, .. },
							..
						},
					..
				} => {
					let tasks: Vec<_> = reason
						.work_items()
						.iter()
						.map(|work_item| self.upsert_crm_github_repo(work_item.repo_id()))
						.collect();
					for task in tasks {
						task.await?;
					}
				},
				_ => (),
			},
		}

		Ok(())
	}
}

#[cfg(test)]
mod tests {

	use async_trait::async_trait;
	use diesel::result::Error as DieselError;
	use domain::{
		GithubFetchIssueService, GithubFetchRepoService, GithubFetchUserService, GithubIssue,
		GithubIssueNumber, GithubRepo, GithubRepoLanguages, GithubSearchIssueService,
		GithubSearchUserService, GithubServiceResult, GithubUser, GithubUserId,
	};
	use infrastructure::database::DatabaseError;
	use mockall::{mock, predicate::eq};
	use reqwest::Url;
	use rstest::{fixture, rstest};

	use super::*;

	mock! {
		GithubService {}

		#[async_trait]
		impl GithubFetchIssueService for GithubService {
			async fn issue(
				&self,
				repo_owner: &str,
				repo_name: &str,
				issue_number: &GithubIssueNumber,
			) -> GithubServiceResult<GithubIssue>;

			async fn issue_by_repo_id(
				&self,
				repo_id: &GithubRepositoryId,
				issue_number: &GithubIssueNumber,
			) -> GithubServiceResult<GithubIssue>;

			async fn pulls_by_repo_id(&self, repo_id: &GithubRepositoryId) -> GithubServiceResult<Vec<GithubIssue>>;
		}
		#[async_trait]
		impl GithubFetchUserService for GithubService {
			async fn user(&self, username: &str) -> GithubServiceResult<GithubUser>;
			async fn user_by_id(&self, id: &GithubUserId) -> GithubServiceResult<GithubUser>;
		}
		#[async_trait]
		impl GithubFetchRepoService for GithubService{
			async fn repo_by_id(&self, id: &GithubRepositoryId) -> GithubServiceResult<GithubRepo>;
			async fn repo_by_url(&self, url: &Url) -> GithubServiceResult<GithubRepo>;
			async fn repo_languages(&self, id: &GithubRepositoryId) -> GithubServiceResult<GithubRepoLanguages>;
		}
		#[async_trait]
		impl GithubSearchIssueService for GithubService {
			async fn issues(
				&self,
				query: &str,
				sort: Option<String>,
				order: Option<String>,
				per_page: Option<u8>,
				page: Option<u32>,
			) -> GithubServiceResult<Vec<GithubIssue>>;
		}
		#[async_trait]
		impl GithubSearchUserService for GithubService{
			async fn users(
				&self,
				query: &str,
				sort: Option<String>,
				order: Option<String>,
				per_page: Option<u8>,
				page: Option<u32>,
			) -> GithubServiceResult<Vec<GithubUser>>;
		}
	}

	#[fixture]
	fn github_repo_id() -> GithubRepositoryId {
		GithubRepositoryId::from(1234)
	}

	#[fixture]
	fn repo(github_repo_id: GithubRepositoryId) -> GithubRepo {
		GithubRepo::new(
			github_repo_id,
			"owner".to_string(),
			"name".to_string(),
			vec![],
			url::Url::parse("http://logo.com").unwrap(),
			url::Url::parse("http://plop.com").unwrap(),
			"description".to_string(),
			0,
			0,
		)
	}

	#[rstest]
	async fn test_upsert_crm_github_repo_when_no_entry_exists(
		github_repo_id: GithubRepositoryId,
		repo: GithubRepo,
	) {
		let mut crm_github_repo_repository = CrmGithubRepoRepository::default();
		crm_github_repo_repository
			.expect_find_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(|_| Err(DatabaseError::Transaction(DieselError::NotFound)));

		let mut github_service = MockGithubService::default();
		github_service
			.expect_repo_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| Ok(repo.clone()));

		crm_github_repo_repository.expect_upsert().once().returning(|_| Ok(()));

		let projector = Projector::new(crm_github_repo_repository, Arc::new(github_service));

		projector.upsert_crm_github_repo(&github_repo_id).await.unwrap();
	}

	#[rstest]
	async fn test_upsert_crm_github_repo_when_entry_is_outdated(
		github_repo_id: GithubRepositoryId,
		repo: GithubRepo,
	) {
		let mut crm_github_repo_repository = CrmGithubRepoRepository::default();
		crm_github_repo_repository
			.expect_find_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| {
				Ok(CrmGithubRepo::new(
					github_repo_id,
					"owner".to_string(),
					"name".to_string(),
					Some(Utc::now().naive_utc() - chrono::Duration::seconds(100)),
				))
			});

		let mut github_service = MockGithubService::default();
		github_service
			.expect_repo_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| Ok(repo.clone()));

		crm_github_repo_repository.expect_upsert().once().returning(|_| Ok(()));

		let projector = Projector::new(crm_github_repo_repository, Arc::new(github_service));

		projector.upsert_crm_github_repo(&github_repo_id).await.unwrap();
	}

	#[rstest]
	async fn test_upsert_crm_github_repo_when_entry_is_not_dated(
		github_repo_id: GithubRepositoryId,
		repo: GithubRepo,
	) {
		let mut crm_github_repo_repository = CrmGithubRepoRepository::default();
		crm_github_repo_repository
			.expect_find_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| {
				Ok(CrmGithubRepo::new(
					github_repo_id,
					"owner".to_string(),
					"name".to_string(),
					None,
				))
			});

		let mut github_service = MockGithubService::default();
		github_service
			.expect_repo_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| Ok(repo.clone()));

		crm_github_repo_repository.expect_upsert().once().returning(|_| Ok(()));

		let projector = Projector::new(crm_github_repo_repository, Arc::new(github_service));

		projector.upsert_crm_github_repo(&github_repo_id).await.unwrap();
	}

	#[rstest]
	async fn test_upsert_crm_github_repo_when_entry_is_valid(github_repo_id: GithubRepositoryId) {
		let mut crm_github_repo_repository = CrmGithubRepoRepository::default();
		crm_github_repo_repository
			.expect_find_by_id()
			.with(eq(github_repo_id))
			.once()
			.returning(move |_| {
				Ok(CrmGithubRepo::new(
					github_repo_id,
					"owner".to_string(),
					"name".to_string(),
					Some(Utc::now().naive_utc()),
				))
			});

		let mut github_service = MockGithubService::default();
		github_service.expect_repo_by_id().never();

		crm_github_repo_repository.expect_upsert().never();

		let projector = Projector::new(crm_github_repo_repository, Arc::new(github_service));

		projector.upsert_crm_github_repo(&github_repo_id).await.unwrap();
	}
}
