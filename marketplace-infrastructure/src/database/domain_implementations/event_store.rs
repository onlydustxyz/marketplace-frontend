use crate::database::{models, schema::events, Client};
use diesel::prelude::*;
use marketplace_domain::*;
use serde_json::Value;

const CONTRIBUTION_AGGREGATE: &str = "CONTRIBUTION";

impl EventStore<ContributionAggregateRoot> for Client {
	fn append(
		&self,
		aggregate_id: &<ContributionAggregateRoot as AggregateRoot>::Id,
		events: Vec<<ContributionAggregateRoot as AggregateRoot>::Event>,
	) -> Result<(), EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let events = events
			.iter()
			.map(|event| {
				Ok(models::Event {
					aggregate_name: CONTRIBUTION_AGGREGATE.to_string(),
					aggregate_id: aggregate_id.to_string(),
					payload: serde_json::to_value(event)
						.map_err(|_| EventStoreError::InvalidEvent)?,
				})
			})
			.collect::<Result<Vec<_>, EventStoreError>>()?;

		diesel::insert_into(events::table)
			.values(&events)
			.execute(&*connection)
			.map_err(|_| EventStoreError::Append)?;

		Ok(())
	}

	fn list_by_id(
		&self,
		aggregate_id: &<ContributionAggregateRoot as AggregateRoot>::Id,
	) -> Result<Vec<<ContributionAggregateRoot as AggregateRoot>::Event>, EventStoreError> {
		let connection = self.connection().map_err(|_| EventStoreError::Connection)?;

		let query = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_id.eq(aggregate_id.to_string()))
			.filter(events::aggregate_name.eq_all(CONTRIBUTION_AGGREGATE))
			.order_by(events::index)
			.into_boxed();
		let serialized_events =
			query.load::<Value>(&*connection).map_err(|_| EventStoreError::List)?;
		let deserialized_events: Result<
			Vec<<ContributionAggregateRoot as AggregateRoot>::Event>,
			_,
		> = serialized_events
			.iter()
			.map(|event_value| {
				serde_json::from_value::<<ContributionAggregateRoot as AggregateRoot>::Event>(
					event_value.to_owned(),
				)
			})
			.collect();
		deserialized_events.map_err(|_| EventStoreError::List)
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::database::{init_pool, Client};
	use rstest::{fixture, rstest};
	use std::str::FromStr;

	#[fixture]
	fn event_store() -> Box<dyn marketplace_domain::EventStore<ContributionAggregateRoot>> {
		let event_store = Client::new(init_pool());
		Box::new(event_store) as Box<dyn EventStore<ContributionAggregateRoot>>
	}

	#[rstest]
	#[ignore = "require a database"]
	fn test_append_and_list(event_store: Box<dyn EventStore<ContributionAggregateRoot>>) {
		let contribution_id: ContributionId = HexPrefixedString::from_str("0x123").unwrap().into();
		let contributor_id: ContributorId = HexPrefixedString::from_str("0x456").unwrap().into();
		let creation_event = ContributionEvent::Created {
			id: contribution_id.clone(),
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		};
		let assigned_event = ContributionEvent::Assigned {
			id: contribution_id.clone(),
			contributor_id,
		};

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
		assert_eq!(*contribution_events.first().unwrap(), creation_event);
		assert_eq!(*contribution_events.last().unwrap(), assigned_event);
	}
}
