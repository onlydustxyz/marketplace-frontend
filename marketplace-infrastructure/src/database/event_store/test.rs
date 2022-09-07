use crate::database::{init_pool, Client};
use marketplace_domain::*;
use rstest::{fixture, rstest};
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
fn contributor_id() -> ContributorId {
	HexPrefixedString::from_str("0x456").unwrap().into()
}

#[fixture]
fn creation_event(contribution_id: ContributionId) -> StorableEvent<Contribution> {
	StorableEvent {
		event: ContributionEvent::Created {
			id: contribution_id.clone(),
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		},
		deduplication_id: "dedup1".to_string(),
	}
}

#[fixture]
fn assigned_event(
	contribution_id: ContributionId,
	contributor_id: ContributorId,
) -> StorableEvent<Contribution> {
	StorableEvent {
		event: ContributionEvent::Assigned {
			id: contribution_id.clone(),
			contributor_id,
		},
		deduplication_id: "dedup2".to_string(),
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
	assert_eq!(*contribution_events.first().unwrap(), creation_event.event);
	assert_eq!(*contribution_events.last().unwrap(), assigned_event.event);
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
				vec![creation_event.clone(), creation_event.clone()]
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
	assert!(event_store.append(&contribution_id, vec![creation_event.clone()]).is_err());
}
