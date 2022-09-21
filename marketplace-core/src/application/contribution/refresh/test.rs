use super::*;
use async_trait::async_trait;
use chrono::{NaiveDate, NaiveDateTime, Utc};
use dotenv::dotenv;
use marketplace_infrastructure::database::Client as DatabaseClient;
use marketplace_tests::init_pool;
use mockall::mock;
use rstest::*;
use std::{ops::Deref, str::FromStr, sync::Arc};

const STARKONQUEST: GithubProjectId = 481932781;

mock! {
	pub GithubClient {}

	#[async_trait]
	impl GithubClient for GithubClient {
		async fn find_issue_by_id(
			&self,
			project_id: GithubProjectId,
			issue_number: GithubIssueNumber,
		) -> Result<GithubIssue, GithubClientError>;

		async fn find_repository_by_id(
			&self,
			project_id: GithubProjectId,
		) -> Result<GithubRepo, GithubClientError>;

		async fn find_user_by_id(&self, user_id: GithubUserId) -> Result<GithubUser, GithubClientError>;
	}
}

mock! {
	pub ContributorService {}

	#[async_trait]
	impl ContributorService for ContributorService {
		async fn contributor_by_id(&self, contributor_id: &ContributorId) -> Result<Contributor, ContributorServiceError>;
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
			timestamp: Utc::now().naive_utc(),
		}
	}
}

#[fixture]
fn database() -> Arc<DatabaseClient> {
	dotenv().ok();
	Arc::new(DatabaseClient::new(init_pool()))
}

#[fixture]
fn github_client() -> MockGithubClient {
	MockGithubClient::new()
}

#[fixture]
fn contributor_service() -> MockContributorService {
	MockContributorService::new()
}

#[fixture]
fn contributor_id() -> ContributorId {
	ContributorId::from_str("0x666").unwrap()
}

#[fixture]
fn project() -> ProjectProjection {
	ProjectProjection {
		id: STARKONQUEST,
		owner: String::from("onlydustxyz"),
		name: String::from("starkonquest"),
		..Default::default()
	}
}

#[fixture]
fn now() -> NaiveDateTime {
	NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11)
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributor_id: ContributorId,
	now: NaiveDateTime,
) -> Arc<DatabaseClient> {
	// events for contribution #1
	{
		let contribution_id = ContributionId::from_str("0x17267621").unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: STARKONQUEST,
				issue_number: 51,
				gate: 0,
			},
			ContributionEvent::Applied {
				id: contribution_id.clone(),
				contributor_id: contributor_id.clone(),
				applied_at: now,
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
		.collect();

		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
			&contribution_id,
			storable_events,
		)
		.expect("Unable to add events in event store");
	}

	// events for contribution #2
	{
		let contribution_id = ContributionId::from_str("0x17267622").unwrap();
		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
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
					applied_at: now,
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

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributions_from_events(
	filled_database: Arc<DatabaseClient>,
	mut github_client: MockGithubClient,
	project: ProjectProjection,
) {
	let refresh_contributions_usecase: RefreshContributions = {
		github_client.expect_find_issue_by_id().returning(|_, _| Ok(Default::default()));

		Refresh::new(
			filled_database.clone(),
			Arc::new(ContributionProjector::new(
				filled_database.clone(),
				Arc::new(github_client),
			)),
			filled_database.clone(),
		)
	};

	let result = refresh_contributions_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	// add project - needed for the GET call below
	ProjectProjectionRepository::store(&*filled_database.clone(), project)
		.expect("Unable to insert project in repository");

	let projection = filled_database
		.find_all_with_contributions()
		.expect("Unable to read projection table");

	let project = projection
		.into_iter()
		.find(|p| p.project.id == STARKONQUEST)
		.expect("Cannot find project in projection");

	assert!(project.contributions.len() >= 2); // TODO: restore the equality when component tests are refactored and using a test transaction

	{
		let contribution_id = ContributionId::from_str("0x17267621").unwrap();
		let contribution = project.contributions.iter().find(|c| c.id == contribution_id).unwrap();
		assert_eq!(ContributionStatus::Completed, contribution.status);
	}

	{
		let contribution_id = ContributionId::from_str("0x17267622").unwrap();
		let contribution = project.contributions.iter().find(|c| c.id == contribution_id).unwrap();
		assert_eq!(ContributionStatus::Open, contribution.status);
	}
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_applications_from_events(
	filled_database: Arc<DatabaseClient>,
	contributor_id: ContributorId,
) {
	let refresh_applications_usecase: RefreshApplications = {
		Refresh::new(
			filled_database.clone(),
			Arc::new(ApplicationProjector::new(
				filled_database.clone(),
				Arc::new(RandomUuidGenerator),
			)),
			filled_database.clone(),
		)
	};

	let result = refresh_applications_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let applications = filled_database
		.list_by_contributor(Some(contributor_id))
		.expect("Unable to read projection table");

	println!("{applications:?}");

	assert_eq!(applications.len(), 2);
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_projects_from_events(
	filled_database: Arc<DatabaseClient>,
	mut github_client: MockGithubClient,
	project: ProjectProjection,
) {
	let refresh_projects_usecase: RefreshProjects = {
		github_client.expect_find_repository_by_id().returning(move |_| {
			Ok(GithubRepo {
				project_id: project.id,
				owner: project.owner.clone(),
				name: project.name.clone(),
				..Default::default()
			})
		});

		Refresh::new(
			filled_database.clone(),
			Arc::new(ProjectProjector::new(
				Arc::new(github_client),
				filled_database.clone(),
			)),
			filled_database.clone(),
		)
	};

	let result = refresh_projects_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let projects = filled_database
		.find_all_with_contributions()
		.expect("Unable to read projection table");

	assert_eq!(1, projects.len());
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributors_from_events(
	filled_database: Arc<DatabaseClient>,
	mut github_client: MockGithubClient,
	contributor_id: ContributorId,
	mut contributor_service: MockContributorService,
) {
	let refresh_contributors_usecase: RefreshContributors = {
		github_client.expect_find_user_by_id().returning(|_| Ok(Default::default()));
		contributor_service
			.expect_contributor_by_id()
			.returning(|_| Ok(Default::default()));

		Refresh::new(
			filled_database.clone(),
			Arc::new(ContributorProjector::new(
				Arc::new(github_client),
				filled_database.clone(),
				Arc::new(contributor_service),
			)),
			filled_database.clone(),
		)
	};

	let result = refresh_contributors_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let result =
		ContributorProjectionRepository::find_by_id(&*filled_database.clone(), &contributor_id);
	assert!(result.is_ok(), "{}", result.err().unwrap());

	assert_eq!(
		ContributorProjection {
			id: contributor_id,
			..Default::default()
		},
		result.unwrap()
	);
}
