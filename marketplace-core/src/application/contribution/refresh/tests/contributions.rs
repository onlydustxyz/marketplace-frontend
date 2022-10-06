use std::{ops::Deref, str::FromStr, sync::Arc};

use chrono::NaiveDateTime;
use lazy_static::lazy_static;
use rstest::{fixture, rstest};

use super::*;
use crate::application::{refresh::Refresh, RefreshContributions};

lazy_static! {
	static ref CONTRIBUTOR_ID: ContributorAccount =
		ContributorAccount::from_str("0x69babe69").unwrap();
}

#[fixture]
#[once]
fn contributions_ids() -> [ContributionId; 3] {
	[
		ContributionId::from_str("0x1234567891").unwrap(),
		ContributionId::from_str("0x1234567892").unwrap(),
		ContributionId::from_str("0x1234567893").unwrap(),
	]
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributions_ids: &[ContributionId],
	now: &NaiveDateTime,
) -> Arc<DatabaseClient> {
	let mut contributions_ids = contributions_ids.iter();
	// events for contribution #1
	{
		let contribution_id = contributions_ids.next().unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 51,
				gate: 0,
			},
			ContributionEvent::Applied {
				id: contribution_id.clone(),
				contributor_id: CONTRIBUTOR_ID.clone(),
				applied_at: *now,
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

	// events for contribution #2
	{
		let contribution_id = contributions_ids.next().unwrap();
		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
			contribution_id,
			vec![
				ContributionEvent::Created {
					id: contribution_id.clone(),
					project_id: PROJECT_ID,
					issue_number: 52,
					gate: 0,
				},
				ContributionEvent::Applied {
					id: contribution_id.clone(),
					contributor_id: CONTRIBUTOR_ID.clone(),
					applied_at: *now,
				},
				ContributionEvent::Assigned {
					id: contribution_id.clone(),
					contributor_id: CONTRIBUTOR_ID.clone(),
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

	// events for contribution #3
	{
		let contribution_id = contributions_ids.next().unwrap();
		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
			contribution_id,
			vec![ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 53,
				gate: 0,
			}]
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
	contributions_ids: &[ContributionId],
) {
	let mut github_client = MockGithubClient::new();
	github_client.expect_find_issue_by_id().returning(|_, _| Ok(Default::default()));

	let refresh_contributions_usecase: RefreshContributions = Refresh::new(
		filled_database.clone(),
		Arc::new(ContributionProjector::new(
			filled_database.clone(),
			Arc::new(github_client),
		)),
		filled_database.clone(),
	);

	let result = refresh_contributions_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let contributions =
		ContributionProjectionRepository::list_by_project(filled_database.deref(), &PROJECT_ID)
			.expect("Cannot find contributions for project");

	assert_eq!(contributions.len(), contributions_ids.len());

	let mut contributions_ids = contributions_ids.iter();
	{
		let contribution_id = contributions_ids.next().unwrap();
		let contribution = contributions.iter().find(|c| c.id == *contribution_id).unwrap();
		assert_eq!(ContributionStatus::Completed, contribution.status);
	}
	{
		let contribution_id = contributions_ids.next().unwrap();
		let contribution = contributions.iter().find(|c| c.id == *contribution_id).unwrap();
		assert_eq!(ContributionStatus::Open, contribution.status);
	}
	{
		let contribution_id = contributions_ids.next().unwrap();
		let contribution = contributions.iter().find(|c| c.id == *contribution_id).unwrap();
		assert_eq!(ContributionStatus::Open, contribution.status);
	}
}
