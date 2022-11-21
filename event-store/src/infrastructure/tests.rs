use crate::{domain::EventStore, Event, EventOrigin};
use backend_domain::{Event as DomainEvent, EventStore as DomainEventStore, Payment, PaymentId};
use backend_infrastructure::database::{schema::events, Client};
use chrono::Utc;
use diesel::{query_dsl::select_dsl::SelectDsl, RunQueryDsl};
use rstest::{fixture, rstest};
use serde_json::{json, Value};
use std::str::FromStr;
use testing::{fixtures, init_pool};
use uuid::Uuid;

#[fixture]
#[once]
fn database() -> Client {
	Client::new(init_pool())
}

#[fixture]
fn contributor_id() -> Uuid {
	Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
}

#[fixture]
fn payment_id() -> PaymentId {
	fixtures::payment::payment_id()
}

#[fixture]
fn payment_processed_event() -> Event {
	Event {
		event: fixtures::payment::events::payment_processed().into(),
		timestamp: Utc::now().naive_utc(),
		deduplication_id: "dedup1".to_string(),
		origin: EventOrigin::Starknet,
		metadata: json!({"key": "value"}),
	}
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_append_and_list(database: &Client, payment_id: PaymentId, payment_processed_event: Event) {
	assert!(
		EventStore::append(
			database,
			&payment_id.to_string(),
			payment_processed_event.clone()
		)
		.is_ok()
	);

	let events = DomainEventStore::<Payment>::list_by_id(database, &payment_id).unwrap();
	assert_eq!(events.len(), 1);
	assert_eq!(
		DomainEvent::Payment(events.first().unwrap().clone()),
		payment_processed_event.event
	);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_ignore_duplicate_event(
	database: &Client,
	payment_id: PaymentId,
	payment_processed_event: Event,
) {
	assert!(
		EventStore::append(
			database,
			&payment_id.to_string(),
			payment_processed_event.clone()
		)
		.is_ok()
	);
	assert!(EventStore::append(database, &payment_id.to_string(), payment_processed_event).is_ok());

	let events = DomainEventStore::<Payment>::list_by_id(database, &payment_id).unwrap();
	assert_eq!(events.len(), 1);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn test_metadata_are_stored(
	database: &Client,
	payment_id: PaymentId,
	payment_processed_event: Event,
) {
	assert!(EventStore::append(database, &payment_id.to_string(), payment_processed_event).is_ok());

	let connection = database.connection().unwrap();
	let list: Vec<(String, Option<Value>)> = events::dsl::events
		.select((events::dsl::origin, events::dsl::metadata))
		.load(&*connection)
		.unwrap();
	assert!(list.contains(&("starknet".to_string(), Some(json!({"key": "value"})))));
}
