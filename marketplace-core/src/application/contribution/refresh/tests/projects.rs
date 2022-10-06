use lazy_static::lazy_static;
use rstest::rstest;
use std::ops::Deref;

use super::*;
use crate::application::{refresh::Refresh, RefreshProjects};

lazy_static! {
	static ref CONTRIBUTOR_ID: ContributorAccount =
		ContributorAccount::from_str("0x69babe69").unwrap();
}

lazy_static! {
	static ref CONTRIBUTIONS_IDS: [ContributionId; 2] = [
		ContributionId::from_str("0x1234567891").unwrap(),
		ContributionId::from_str("0x1234567892").unwrap()
	];
}
#[fixture]
fn filled_database(database: Arc<DatabaseClient>) -> Arc<DatabaseClient> {
	let mut contributions_ids = CONTRIBUTIONS_IDS.iter();

	// events for contribution #1
	{
		let contribution_id = contributions_ids.next().unwrap();
		let storable_events = vec![ContributionEvent::Created {
			id: contribution_id.clone(),
			project_id: PROJECT_ID,
			issue_number: 51,
			gate: 0,
		}]
		.into_iter()
		.map(Storable::into_storable)
		.collect();

		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
			contribution_id,
			storable_events,
		)
		.expect("Unable to add events in event store");
	}

	// events for contribution #2
	{
		let contribution_id = contributions_ids.next().unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 51,
				gate: 0,
			},
			ContributionEvent::Assigned {
				id: contribution_id.clone(),
				contributor_id: CONTRIBUTOR_ID.clone(),
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
			contribution_id,
			storable_events,
		)
		.expect("Unable to add events in event store");
	}

	database
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_projects_from_events(filled_database: Arc<DatabaseClient>) {
	let project_name = "Bitcoin";
	let project_owner = "Satoshi Nakamoto";

	let mut github_client = MockGithubClient::new();
	github_client.expect_find_repository_by_id().returning(|_| {
		Ok(GithubRepo {
			project_id: PROJECT_ID,
			owner: project_owner.to_string(),
			name: project_name.to_string(),
			..Default::default()
		})
	});

	let refresh_projects_usecase: RefreshProjects = Refresh::new(
		filled_database.clone(),
		Arc::new(ProjectProjector::new(
			Arc::new(github_client),
			filled_database.clone(),
		)),
		filled_database.clone(),
	);

	let result = refresh_projects_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let projects = filled_database
		.find_all_with_contributions()
		.expect("Unable to read projection table");

	let project = projects
		.iter()
		.find(|p| p.project.id == PROJECT_ID)
		.expect("Projects list should contain a project with id PROJECT_ID");

	assert_eq!(project.project.name, project_name);
	assert_eq!(project.project.owner, project_owner);
}
