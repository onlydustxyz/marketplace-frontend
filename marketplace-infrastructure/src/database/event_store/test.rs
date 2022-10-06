use crate::{
	database::{init_pool, schema::events, Client},
	diesel::{query_dsl::select_dsl::SelectDsl, RunQueryDsl},
};
use chrono::Utc;
use marketplace_domain::*;
use rocket::serde::json::serde_json::Value;
use rstest::{fixture, rstest};
use serde_json::json;
use std::str::FromStr;

#[fixture]
fn event_store() -> Box<dyn marketplace_domain::EventStore<Contribution>> {
	let event_store = Client::new(init_pool());
	Box::new(event_store) as Box<dyn EventStore<Contribution>>
}

#[fixture]
fn contribution_id() -> ContributionId {
	HexPrefixedString::from_str("0x123").unwrap().into()
}

#[fixture]
fn contributor_id() -> ContributorAccountAddress {
	HexPrefixedString::from_str("0x456").unwrap().into()
}

#[fixture]
fn creation_event(contribution_id: ContributionId) -> StorableEvent<Contribution> {
	StorableEvent {
		event: ContributionEvent::Created {
			id: contribution_id,
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		},
		timestamp: Utc::now().naive_utc(),
		deduplication_id: "dedup1".to_string(),
		origin: EventOrigin::Starknet,
		metadata: json!({"key": "value"}),
	}
}

#[fixture]
fn assigned_event(
	contribution_id: ContributionId,
	contributor_id: ContributorAccountAddress,
) -> StorableEvent<Contribution> {
	StorableEvent {
		event: ContributionEvent::Assigned {
			id: contribution_id,
			contributor_id,
		},
		timestamp: Utc::now().naive_utc(),
		deduplication_id: "dedup2".to_string(),
		origin: EventOrigin::Starknet,
		metadata: Default::default(),
	}
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_append_and_list(
	event_store: Box<dyn EventStore<Contribution>>,
	contribution_id: ContributionId,
	creation_event: StorableEvent<Contribution>,
	assigned_event: StorableEvent<Contribution>,
) {
	assert!(
		event_store
			.append(
				&contribution_id,
				vec![creation_event.clone(), assigned_event.clone()]
			)
			.is_ok()
	);

	let contribution_events = event_store.list_by_id(&contribution_id).unwrap();
	assert_eq!(contribution_events.len(), 2);
	assert_eq!(
		*contribution_events.first().unwrap(),
		Event::Contribution(creation_event.event)
	);
	assert_eq!(
		*contribution_events.last().unwrap(),
		Event::Contribution(assigned_event.event)
	);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_cannot_append_duplicate_event_in_same_batch(
	event_store: Box<dyn EventStore<Contribution>>,
	contribution_id: ContributionId,
	creation_event: StorableEvent<Contribution>,
) {
	assert!(
		event_store
			.append(
				&contribution_id,
				vec![creation_event.clone(), creation_event]
			)
			.is_err()
	);

	let contribution_events = event_store.list_by_id(&contribution_id).unwrap();
	assert_eq!(contribution_events.len(), 0);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_cannot_append_duplicate_event_in_different_batches(
	event_store: Box<dyn EventStore<Contribution>>,
	contribution_id: ContributionId,
	creation_event: StorableEvent<Contribution>,
) {
	assert!(event_store.append(&contribution_id, vec![creation_event.clone()]).is_ok());
	assert!(event_store.append(&contribution_id, vec![creation_event]).is_err());
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_metadata_are_stored(
	contribution_id: ContributionId,
	creation_event: StorableEvent<Contribution>,
) {
	let client = Client::new(init_pool());
	assert!(client.append(&contribution_id, vec![creation_event]).is_ok());

	let connection = client.connection().unwrap();
	let list: Vec<(String, Option<Value>)> = events::dsl::events
		.select((events::dsl::origin, events::dsl::metadata))
		.load(&*connection)
		.unwrap();
	assert!(list.contains(&("starknet".to_string(), Some(json!({"key": "value"})))));
}
