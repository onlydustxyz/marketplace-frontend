use super::*;
use async_trait::async_trait;
use dotenv::dotenv;
use marketplace_infrastructure::database::{init_pool, Client as DatabaseClient};
use mockall::mock;
use rstest::*;
use std::{str::FromStr, sync::Arc};

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
fn github_client() -> MockGithubClient {
	MockGithubClient::new()
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
fn filled_database(
	database: Arc<DatabaseClient>,
	contributor_id: ContributorId,
) -> Arc<DatabaseClient> {
	// events for contribution #1
	{
		let contribution_id = ContributionId::from_str("0x17267621").unwrap();
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
		let contribution_id = ContributionId::from_str("0x17267622").unwrap();
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
	mut github_client: MockGithubClient,
) -> RefreshContributions {
	github_client.expect_find_issue_by_id().returning(|_, _| Ok(Default::default()));

	Refresh::new(
		filled_database.clone(),
		Arc::new(ContributionProjector::new(
			filled_database.clone(),
			Arc::new(github_client),
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

#[fixture]
fn refresh_projects_usecase(
	filled_database: Arc<DatabaseClient>,
	mut github_client: MockGithubClient,
	project: ProjectProjection,
) -> RefreshProjects {
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
		filled_database,
	)
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributions_from_events(
	refresh_contributions_usecase: RefreshContributions,
	database: Arc<DatabaseClient>,
	project: ProjectProjection,
) {
	let result = refresh_contributions_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	// add project - needed for the GET call below
	ProjectProjectionRepository::store(&*database, project)
		.expect("Unable to insert project in repository");

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

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_projects_from_events(
	refresh_projects_usecase: RefreshProjects,
	database: Arc<DatabaseClient>,
) {
	let result = refresh_projects_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let projects = database.find_all_with_contributions().expect("Unable to read projection table");

	assert_eq!(1, projects.len());
}
