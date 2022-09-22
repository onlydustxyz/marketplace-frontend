use std::{ops::Deref, str::FromStr, sync::Arc};

use lazy_static::lazy_static;
use rstest::{fixture, rstest};

use super::*;
use crate::application::{refresh::Refresh, RefreshContributors};

lazy_static! {
	static ref IDS: [(ContributionId, ContributorId); 3] = [
		(
			ContributionId::from_str("0x1234567891").unwrap(),
			ContributorId::from_str("0x1234567891").unwrap(),
		),
		(
			ContributionId::from_str("0x1234567892").unwrap(),
			ContributorId::from_str("0x1234567892").unwrap(),
		),
		(
			ContributionId::from_str("0x1234567893").unwrap(),
			ContributorId::from_str("0x123456789").unwrap(),
		),
	];
}

#[fixture]
fn filled_database(database: Arc<DatabaseClient>) -> Arc<DatabaseClient> {
	let mut ids = IDS.iter();

	// events for contribution #1
	{
		let (contribution_id, contributor_id) = ids.next().unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 51,
				gate: 0,
			},
			ContributionEvent::Assigned {
				id: contribution_id.clone(),
				contributor_id: contributor_id.clone(),
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
		let (contribution_id, contributor_id) = ids.next().unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 52,
				gate: 0,
			},
			ContributionEvent::Assigned {
				id: contribution_id.clone(),
				contributor_id: contributor_id.clone(),
			},
			ContributionEvent::Unassigned {
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

	// events for contribution #3
	{
		let (contribution_id, contributor_id) = ids.next().unwrap();
		let storable_events = vec![
			ContributionEvent::Created {
				id: contribution_id.clone(),
				project_id: PROJECT_ID,
				issue_number: 52,
				gate: 0,
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
			contribution_id,
			storable_events,
		)
		.expect("Unable to add events in event store");
	}
	database
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributors_from_events(filled_database: Arc<DatabaseClient>) {
	let mut github_client = MockGithubClient::new();
	github_client.expect_find_user_by_id().returning(|_| Ok(Default::default()));

	let mut contributor_service = MockContributorService::new();
	contributor_service
		.expect_contributor_by_id()
		.returning(|_| Ok(Default::default()));

	let refresh_contributors_usecase: RefreshContributors = {
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

	for (_, contributor_id) in IDS.iter() {
		let result =
			ContributorProjectionRepository::find_by_id(&*filled_database.clone(), contributor_id);
		assert!(result.is_ok(), "{}", result.err().unwrap());

		assert_eq!(
			ContributorProjection {
				id: contributor_id.clone(),
				..Default::default()
			},
			result.unwrap()
		);
	}
}
