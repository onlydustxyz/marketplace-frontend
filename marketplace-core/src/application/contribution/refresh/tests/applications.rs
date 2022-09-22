use lazy_static::lazy_static;
use rstest::rstest;
use std::ops::Deref;

use super::*;
use crate::application::{refresh::Refresh, RefreshApplications};

lazy_static! {
	static ref CONTRIBUTOR_ID: ContributorId = ContributorId::from_str("0x69babe69").unwrap();
}

#[fixture]
#[once]
fn contributions_ids() -> [ContributionId; 5] {
	[
		ContributionId::from_str("0x1234567891").unwrap(),
		ContributionId::from_str("0x1234567892").unwrap(),
		ContributionId::from_str("0x1234567893").unwrap(),
		ContributionId::from_str("0x1234567894").unwrap(),
		ContributionId::from_str("0x1234567895").unwrap(),
	]
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributions_ids: &[ContributionId],
	now: &NaiveDateTime,
) -> Arc<DatabaseClient> {
	let mut contributions_ids = contributions_ids.iter();

	// events for contribution #1: Applied
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

	// events for contribution #2: Assigned
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
			]
			.into_iter()
			.map(Storable::into_storable)
			.collect(),
		)
		.expect("Unable to add events in event store");
	}

	// events for contribution #3: Validated
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

	// events for contribution #4: Unassigned
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

	// events for contribution #5: Refused
	{
		let contribution_id = contributions_ids.next().unwrap();
		<DatabaseClient as EventStore<Contribution>>::append(
			database.deref(),
			contribution_id,
			vec![
				ContributionEvent::Created {
					id: contribution_id.clone(),
					project_id: PROJECT_ID,
					issue_number: 53,
					gate: 0,
				},
				ContributionEvent::Applied {
					id: contribution_id.clone(),
					contributor_id: CONTRIBUTOR_ID.clone(),
					applied_at: *now,
				},
				ContributionEvent::ApplicationRefused {
					id: contribution_id.clone(),
					contributor_id: CONTRIBUTOR_ID.clone(),
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
async fn refresh_applications_from_events(
	filled_database: Arc<DatabaseClient>,
	contributions_ids: &[ContributionId],
) {
	let refresh_applications_usecase: RefreshApplications = Refresh::new(
		filled_database.clone(),
		Arc::new(ApplicationProjector::new(
			filled_database.clone(),
			Arc::new(RandomUuidGenerator),
		)),
		filled_database.clone(),
	);

	let result = refresh_applications_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let applications = filled_database
		.list_by_contributor(Some(CONTRIBUTOR_ID.clone()))
		.expect("Unable to read projection table");

	// Only #1, applied but not assigned nor refused
	assert_eq!(applications.len(), 1);
	assert_eq!(
		applications.first().unwrap().contribution_id(),
		contributions_ids.first().unwrap(),
	);
}
