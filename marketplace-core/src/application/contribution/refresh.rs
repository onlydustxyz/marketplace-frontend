use std::sync::Arc;

use marketplace_domain::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	ProjectionRepository(#[from] ProjectionRepositoryError),
	#[error(transparent)]
	EventStore(#[from] EventStoreError),
}

pub struct Refresh {
	contribution_projection_repository: Arc<dyn ProjectionRepository<Contribution>>,
	contribution_projector: Arc<dyn Projector<Contribution>>,
	contribution_event_store: Arc<dyn EventStore<Contribution>>,
}

impl Refresh {
	pub fn new(
		contribution_projection_repository: Arc<dyn ProjectionRepository<Contribution>>,
		contribution_projector: Arc<dyn Projector<Contribution>>,
		event_store: Arc<dyn EventStore<Contribution>>,
	) -> Self {
		Self {
			contribution_projection_repository,
			contribution_projector,
			contribution_event_store: event_store,
		}
	}

	pub async fn refresh_projection_from_events(&self) -> Result<(), Error> {
		self.contribution_projection_repository.clear()?;

		let events = self.contribution_event_store.list()?;

		for event in events.iter() {
			self.contribution_projector.project(event).await;
		}

		Ok(())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use async_trait::async_trait;
	use dotenv::dotenv;
	use marketplace_domain::GithubIssueRepository;
	use marketplace_infrastructure::database::{init_pool, Client as DatabaseClient};
	use mockall::mock;
	use rstest::*;
	use std::str::FromStr;

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
	fn filled_database(database: Arc<DatabaseClient>) -> Arc<DatabaseClient> {
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
			let contributor_id = ContributorId::from_str("0x123").unwrap();
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
						ContributionEvent::Assigned {
							id: contribution_id.clone(),
							contributor_id,
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
			let contributor_id = ContributorId::from_str("0x123").unwrap();
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
	fn refresh_usecase(
		filled_database: Arc<DatabaseClient>,
		mut github_issue_repository: MockGithubIssueRepository,
	) -> Refresh {
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

	#[rstest]
	#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
	async fn refresh_contributions_from_events(
		refresh_usecase: Refresh,
		database: Arc<DatabaseClient>,
	) {
		let result = refresh_usecase.refresh_projection_from_events().await;
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
}
