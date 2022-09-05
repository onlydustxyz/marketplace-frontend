use crate::application::refresh::Refresh;
use marketplace_domain::*;

pub type RefreshContributions = Refresh<ContributionProjection, Contribution>;
pub type RefreshApplications = Refresh<ApplicationProjection, Contribution>;

#[cfg(test)]
mod test {
	use super::*;
	use async_trait::async_trait;
	use dotenv::dotenv;
	use marketplace_infrastructure::database::{init_pool, Client as DatabaseClient};
	use mockall::mock;
	use rstest::*;
	use std::{str::FromStr, sync::Arc};

	const STARKONQUEST: GithubProjectId = 481932781;

	mock! {
		pub GithubIssueRepository {}

		#[async_trait]
		impl GithubIssueRepository for GithubIssueRepository {
			async fn find(
				&self,
				project_id: &GithubProjectId,
				issue_number: &GithubIssueNumber,
			) -> Result<Option<GithubIssue>, GithubIssueRepositoryError>;
		}
	}

	trait Storable {
		fn into_storable(self) -> StorableEvent<Contribution>;
	}

	impl Storable for ContributionEvent {
		fn into_storable(self) -> StorableEvent<Contribution> {
			StorableEvent {
				event: self,
				deduplication_id: RandomUuidGenerator.new_uuid().to_string(),
			}
		}
	}

	#[fixture]
	fn database() -> Arc<DatabaseClient> {
		dotenv().ok();
		Arc::new(DatabaseClient::new(init_pool()))
	}

	#[fixture]
	fn github_issue_repository() -> MockGithubIssueRepository {
		MockGithubIssueRepository::new()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		ContributorId::from_str("0x123").unwrap()
	}

	#[fixture]
	fn filled_database(
		database: Arc<DatabaseClient>,
		contributor_id: ContributorId,
	) -> Arc<DatabaseClient> {
		// add project
		// TODO: remove and fetch data at contribution creation time
		database
			.store(Project {
				id: STARKONQUEST,
				owner: String::from("onlydustxyz"),
				name: String::from("starkonquest"),
			})
			.expect("Unable to insert project in repository");

		// events for contribution #1
		{
			let contribution_id = ContributionId::from_str("0x01").unwrap();
			database
				.append(
					&contribution_id,
					vec![
						ContributionEvent::Created {
							id: contribution_id.clone(),
							project_id: STARKONQUEST,
							issue_number: 51,
							gate: 0,
						},
						ContributionEvent::Applied {
							id: contribution_id.clone(),
							contributor_id: contributor_id.clone(),
						},
						ContributionEvent::Assigned {
							id: contribution_id.clone(),
							contributor_id: contributor_id.clone(),
						},
						ContributionEvent::Validated {
							id: contribution_id.clone(),
						},
					]
					.into_iter()
					.map(Storable::into_storable)
					.collect(),
				)
				.expect("Unable to add events in event store");
		}

		// events for contribution #2
		{
			let contribution_id = ContributionId::from_str("0x02").unwrap();
			database
				.append(
					&contribution_id,
					vec![
						ContributionEvent::Created {
							id: contribution_id.clone(),
							project_id: STARKONQUEST,
							issue_number: 52,
							gate: 0,
						},
						ContributionEvent::Applied {
							id: contribution_id.clone(),
							contributor_id: contributor_id.clone(),
						},
						ContributionEvent::Assigned {
							id: contribution_id.clone(),
							contributor_id,
						},
						ContributionEvent::Unassigned {
							id: contribution_id.clone(),
						},
					]
					.into_iter()
					.map(Storable::into_storable)
					.collect(),
				)
				.expect("Unable to add events in event store");
		}

		database
	}

	#[fixture]
	fn refresh_contributions_usecase(
		filled_database: Arc<DatabaseClient>,
		mut github_issue_repository: MockGithubIssueRepository,
	) -> RefreshContributions {
		github_issue_repository.expect_find().returning(|_, _| Ok(Default::default()));

		Refresh::new(
			filled_database.clone(),
			Arc::new(ContributionProjector::new(
				filled_database.clone(),
				Arc::new(github_issue_repository),
			)),
			filled_database,
		)
	}

	#[fixture]
	fn refresh_applications_usecase(filled_database: Arc<DatabaseClient>) -> RefreshApplications {
		Refresh::new(
			filled_database.clone(),
			Arc::new(ApplicationProjector::new(
				filled_database.clone(),
				Arc::new(RandomUuidGenerator),
			)),
			filled_database,
		)
	}

	#[rstest]
	#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
	async fn refresh_contributions_from_events(
		refresh_contributions_usecase: RefreshContributions,
		database: Arc<DatabaseClient>,
	) {
		let result = refresh_contributions_usecase.refresh_projection_from_events().await;
		assert!(result.is_ok(), "{}", result.err().unwrap());

		let projection =
			database.find_all_with_contributions().expect("Unable to read projection table");

		let project = projection
			.into_iter()
			.find(|p| p.project.id == STARKONQUEST)
			.expect("Cannot find project in projection");

		assert_eq!(2, project.contributions.len());
		assert_eq!(
			ContributionStatus::Completed,
			project.contributions[0].status
		);
		assert_eq!(ContributionStatus::Open, project.contributions[1].status);
	}

	#[rstest]
	#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
	async fn refresh_applications_from_events(
		refresh_applications_usecase: RefreshApplications,
		database: Arc<DatabaseClient>,
		contributor_id: ContributorId,
	) {
		let result = refresh_applications_usecase.refresh_projection_from_events().await;
		assert!(result.is_ok(), "{}", result.err().unwrap());

		let applications = database
			.list_by_contributor(Some(contributor_id))
			.expect("Unable to read projection table");

		assert_eq!(2, applications.len());
	}
}
