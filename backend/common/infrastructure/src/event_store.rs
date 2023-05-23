/// This module contains an implementation of the `EventStore` trait for the `Client` struct.
///
/// # Example
///
/// ```rust
/// use domain::{Aggregate, Budget, EventStore, Payment, Project};
/// use crate::database::Client;
///
/// let client = Client::new();
///
/// // retrieve all events for a specific aggregate
/// let events = client.list_by_id("id").unwrap();
///
/// // retrieve all events for all aggregates
/// let events = client.list().unwrap();
/// ```
use diesel::prelude::*;
use domain::{Aggregate, Budget, EventStore, EventStoreError, Payment, Project};
use olog::error;
use serde_json::Value;
use tracing::instrument;

use crate::database::{schema::events, Client};

/// This trait represents an aggregate that has a name associated with it.
trait NamedAggregate: Aggregate {

    /// Returns the name of the aggregate.
	fn name() -> String;
}

impl NamedAggregate for Project {

    fn name() -> String {
		String::from("PROJECT")
	}
}

impl NamedAggregate for Payment {

    fn name() -> String {
		String::from("PAYMENT")
	}
}

impl NamedAggregate for Budget {

    fn name() -> String {
		String::from("BUDGET")
	}
}

impl<A: NamedAggregate> EventStore<A> for Client {

    /// Retrieves all events for a specific aggregate ID.
    ///
    /// # Arguments
    ///
    /// * `aggregate_id` - The ID of the aggregate to retrieve events for.
    ///
    /// # Example
    ///
    /// ```rust
    /// use domain::{Aggregate, Budget, EventStore, Payment, Project};
    /// use crate::database::Client;
    ///
    /// let client = Client::new();
    ///
    /// // retrieve all events for a specific aggregate
    /// let events = client.list_by_id("id").unwrap();
    /// ```
	#[instrument(name = "EventStore::list_by_id", skip_all, fields(aggregate_id = aggregate_id.to_string()))]
	fn list_by_id(&self, aggregate_id: &A::Id) -> Result<Vec<A::Event>, EventStoreError> {
		let connection = self.connection().map_err(|e| {
			error!("Failed to connect to database: {e}");
			EventStoreError::Connection(e.into())
		})?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_id.eq(aggregate_id.to_string()))
			.filter(events::aggregate_name.eq_all(A::name()))
			.order_by(events::timestamp)
			.then_order_by(events::index)
			.load::<Value>(&*connection)
			.map_err(|e| {
				error!(
					"Failed to retrieve {} events of aggregate {aggregate_id} from database: {e}",
					A::name()
				);
				EventStoreError::List(e.into())
			})?;

		deserialize_events::<A>(events)
	}

    /// Retrieves all events for all aggregates.
    ///
    /// # Example
    ///
    /// ```rust
    /// use domain::{Aggregate, Budget, EventStore, Payment, Project};
    /// use crate::database::Client;
    ///
    /// let client = Client::new();
    ///
    /// // retrieve all events for all aggregates
    /// let events = client.list().unwrap();
    /// ```
	#[instrument(name = "EventStore::list", skip_all)]
	fn list(&self) -> Result<Vec<A::Event>, EventStoreError> {
		let connection = self.connection().map_err(|e| {
			error!("Failed to connect to database: {e}");
			EventStoreError::Connection(e.into())
		})?;

		let events = events::dsl::events
			.select(events::payload)
			.filter(events::aggregate_name.eq_all(A::name()))
			.order_by(events::timestamp)
			.then_order_by(events::index)
			.load::<Value>(&*connection)
			.map_err(|e| {
				error!("Failed to retrieve {} events from database: {e}", A::name());
				EventStoreError::List(e.into())
			})?;

		deserialize_events::<A>(events)
	}
}

/// Deserializes a vector of values into a vector of events.
///
/// # Arguments
///
/// * `serialized_events` - The serialized events to deserialize.
///
/// # Example
///
/// ```rust
/// use domain::{Aggregate, Budget, EventStore, Payment, Project};
///
/// let serialized_events = vec![serde_json::json!({"name": "Test"})];
///
/// // deserialize the events
/// let events: Vec<Project::Event> = deserialize_events(serialized_events).unwrap();
/// ```
fn deserialize_events<A: Aggregate>(
	serialized_events: Vec<Value>,
) -> Result<Vec<A::Event>, EventStoreError> {
	serialized_events
		.iter()
		.map(|event_value| {
			serde_json::from_value::<A::Event>(event_value.clone()).map_err(|e| {
				error!("Failed to deserialize event {event_value}: {e}");
				e
			})
		})
		.collect::<Result<Vec<_>, _>>()
		.map_err(|e| EventStoreError::List(e.into()))
}