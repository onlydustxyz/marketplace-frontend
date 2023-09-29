use diesel::prelude::*;
use domain::{Application, Budget, EventSourcable, EventStore, EventStoreError, Payment, Project};
use olog::{error, IntoField};
use serde_json::Value;
use tracing::instrument;

use crate::{database::schema::events, dbclient::Client};

pub trait Named {
	fn name() -> String;
}

impl Named for Application {
	fn name() -> String {
		String::from("APPLICATION")
	}
}

impl Named for Project {
	fn name() -> String {
		String::from("PROJECT")
	}
}

impl Named for Payment {
	fn name() -> String {
		String::from("PAYMENT")
	}
}

impl Named for Budget {
	fn name() -> String {
		String::from("BUDGET")
	}
}

impl<A: Named + EventSourcable> EventStore<A> for Client {
	#[instrument(name = "EventStore::list_by_id", skip_all, fields(aggregate_id = aggregate_id.to_string()))]
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<A::Event>, EventStoreError> {
		let mut connection = self.connection().map_err(|e| {
			error!(error = e.to_field(), "Failed to connect to database");
			EventStoreError::Connection(e.into())
		})?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_id.eq(aggregate_id.to_string()))
			.filter(events::aggregate_name.eq_all(A::name()))
			.order_by(events::timestamp)
			.then_order_by(events::index)
			.load::<Value>(&mut *connection)
			.map_err(|e| {
				error!(
					error = e.to_field(),
					"Failed to retrieve {} events of aggregate {aggregate_id} from database",
					A::name()
				);
				EventStoreError::List(e.into())
			})?;

		deserialize_events::<A>(events)
	}

	#[instrument(name = "EventStore::list", skip_all)]
	fn list(&self) -> Result<Vec<A::Event>, EventStoreError> {
		let mut connection = self.connection().map_err(|e| {
			error!(error = e.to_field(), "Failed to connect to database");
			EventStoreError::Connection(e.into())
		})?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_name.eq_all(A::name()))
			.order_by(events::timestamp)
			.then_order_by(events::index)
			.load::<Value>(&mut *connection)
			.map_err(|e| {
				error!(
					error = e.to_field(),
					"Failed to retrieve {} events from database",
					A::name()
				);
				EventStoreError::List(e.into())
			})?;

		deserialize_events::<A>(events)
	}
}

fn deserialize_events<A: EventSourcable>(
	serialized_events: Vec<Value>,
) -> Result<Vec<A::Event>, EventStoreError> {
	serialized_events
		.iter()
		.map(|event_value| {
			serde_json::from_value::<A::Event>(event_value.clone()).map_err(|e| {
				error!(
					error = e.to_field(),
					"Failed to deserialize event {event_value}"
				);
				e
			})
		})
		.collect::<Result<Vec<_>, _>>()
		.map_err(|e| EventStoreError::List(e.into()))
}
