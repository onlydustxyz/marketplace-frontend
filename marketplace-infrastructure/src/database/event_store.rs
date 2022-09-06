use crate::database::{
	models,
	schema::{event_deduplications, events},
	Client,
};
use diesel::prelude::*;
use marketplace_domain::*;
use serde_json::Value;

use super::schema::events::index;

const CONTRIBUTION_AGGREGATE: &str = "CONTRIBUTION";

impl EventStore<Contribution> for Client {
	fn append(
		&self,
		aggregate_id: &<Contribution as Aggregate>::Id,
		storable_events: Vec<StorableEvent<Contribution>>,
	) -> Result<(), EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let events = storable_events
			.iter()
			.map(|event| {
				Ok(models::Event {
					aggregate_name: CONTRIBUTION_AGGREGATE.to_string(),
					aggregate_id: aggregate_id.to_string(),
					payload: serde_json::to_value(&event.event)
						.map_err(|_| EventStoreError::InvalidEvent)?,
				})
			})
			.collect::<Result<Vec<_>, EventStoreError>>()?;

		connection
			.transaction(|| {
				let inserted_events: Vec<i32> = diesel::insert_into(events::table)
					.values(&events)
					.returning(index)
					.get_results(&*connection)?;

				assert_eq!(inserted_events.len(), storable_events.len());

				let deduplications = storable_events
					.iter()
					.zip(inserted_events)
					.map(|event| models::EventDeduplication {
						deduplication_id: event.0.deduplication_id.to_owned(),
						event_index: event.1,
					})
					.collect::<Vec<_>>();

				diesel::insert_into(event_deduplications::table)
					.values(&deduplications)
					.execute(&*connection)
			})
			.map_err(|_| EventStoreError::Append)?;

		Ok(())
	}

	fn list_by_id(
		&self,
		aggregate_id: &<Contribution as Aggregate>::Id,
	) -> Result<Vec<<Contribution as Aggregate>::Event>, EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_id.eq(aggregate_id.to_string()))
			.filter(events::aggregate_name.eq_all(CONTRIBUTION_AGGREGATE))
			.order_by(events::index)
			.load::<Value>(&*connection)
			.map_err(|_| EventStoreError::List)?;

		deserialize_events(events)
	}

	fn list(&self) -> Result<Vec<<Contribution as Aggregate>::Event>, EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_name.eq_all(CONTRIBUTION_AGGREGATE))
			.order_by(events::index)
			.load::<Value>(&*connection)
			.map_err(|_| EventStoreError::List)?;

		deserialize_events(events)
	}
}

fn deserialize_events(
	serialized_events: Vec<Value>,
) -> Result<Vec<<Contribution as Aggregate>::Event>, EventStoreError> {
	serialized_events
		.iter()
		.map(|event_value| {
			serde_json::from_value::<<Contribution as Aggregate>::Event>(event_value.to_owned())
		})
		.collect::<Result<Vec<_>, _>>()
		.map_err(|_| EventStoreError::List)
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::database::{init_pool, Client};
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
}
