use crate::{domain::*, infrastructure::database::models, Event};
use diesel::prelude::*;
use log::error;
use marketplace_domain::Event as DomainEvent;
use marketplace_infrastructure::database::{
	schema::{event_deduplications, events, events::index},
	Client,
};
use serde_json::{to_value as to_json, Value as Json};

type Result<T> = std::result::Result<T, EventStoreError>;

// TODO: factorize with the one in marketplace-infrastructure
trait NamedAggregate {
	fn aggregate_name(&self) -> &str;
}

impl NamedAggregate for Event {
	fn aggregate_name(&self) -> &str {
		match self.event {
			DomainEvent::Contribution(_) => "CONTRIBUTION",
			DomainEvent::Project(_) => "PROJECT",
			DomainEvent::Contributor(_) => "CONTRIBUTOR",
			DomainEvent::Payment(_) => "PAYMENT",
		}
	}
}

impl EventStore for Client {
	fn append(&self, aggregate_id: &str, storable_events: Vec<Event>) -> Result<()> {
		let connection = self.connection().map_err(|e| {
			error!("Failed to connect to database: {e}");
			EventStoreError::Connection(e.into())
		})?;

		let events = storable_events
			.iter()
			.map(|storable_event| {
				let domain_event = storable_event.event.clone();
				Ok(models::Event {
					timestamp: storable_event.timestamp,
					aggregate_name: storable_event.aggregate_name().to_owned(),
					aggregate_id: aggregate_id.to_owned(),
					payload: serialize_event(&domain_event)?,
					origin: storable_event.origin.to_string(),
					metadata: storable_event.metadata.clone(),
				})
			})
			.collect::<Result<Vec<_>>>()?;

		connection
			.transaction(|| {
				let inserted_events: Vec<i32> = diesel::insert_into(events::table)
					.values(&events)
					.returning(index)
					.get_results(&*connection)?;

				assert_eq!(
					inserted_events.len(),
					storable_events.len(),
					"list of inserted events and storable events should never have different lengths"
				);

				let deduplications = storable_events
					.iter()
					.zip(inserted_events)
					.map(|event| models::EventDeduplication {
						deduplication_id: event.0.deduplication_id.clone(),
						event_index: event.1,
					})
					.collect::<Vec<_>>();

				diesel::insert_into(event_deduplications::table)
					.values(&deduplications)
					.execute(&*connection)
			})
			.map_err(|e| {
				error!("Failed to insert event(s) into database: {e}");
				EventStoreError::Append(e.into())
			})?;

		Ok(())
	}
}

fn serialize_event(event: &DomainEvent) -> Result<Json> {
	match event {
		DomainEvent::Contribution(event) => to_json(event),
		DomainEvent::Project(event) => to_json(event),
		DomainEvent::Contributor(event) => to_json(event),
		DomainEvent::Payment(event) => to_json(event),
	}
	.map_err(|e| {
		error!("Failed to serialize event {event:?}: {e}");
		EventStoreError::InvalidEvent(e.into())
	})
}
