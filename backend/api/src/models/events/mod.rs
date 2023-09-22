use chrono::{NaiveDateTime, Utc};
use diesel::Insertable;
use domain::{CommandId, Identified};
use infrastructure::database::schema::events;
use serde::{Deserialize, Serialize};
use serde_json::{to_value as to_json, Value as Json};

mod repository;
pub use repository::Repository;

#[derive(Debug, Clone, Insertable, Serialize, Deserialize, Queryable, PartialEq, Eq)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Json,
	pub metadata: Json,
	pub command_id: Option<CommandId>,
}

impl TryFrom<domain::Event> for Event {
	type Error = anyhow::Error;

	fn try_from(event: domain::Event) -> Result<Self, Self::Error> {
		Ok(Self {
			timestamp: Utc::now().naive_utc(),
			aggregate_id: aggregate_id(&event),
			aggregate_name: aggregate_name(&event),
			payload: serialize_event(&event)?,
			metadata: Default::default(),
			command_id: None,
		})
	}
}

fn serialize_event(event: &domain::Event) -> Result<Json, serde_json::Error> {
	match event {
		domain::Event::Application(event) => to_json(event),
		domain::Event::Budget(event) => to_json(event),
		domain::Event::Payment(event) => to_json(event),
		domain::Event::Project(event) => to_json(event),
	}
}

fn aggregate_name(event: &domain::Event) -> String {
	match event {
		domain::Event::Application(_) => "APPLICATION",
		domain::Event::Budget(_) => "BUDGET",
		domain::Event::Payment(_) => "PAYMENT",
		domain::Event::Project(_) => "PROJECT",
	}
	.to_string()
}

fn aggregate_id(event: &domain::Event) -> String {
	match event {
		domain::Event::Application(event) => event.id().to_string(),
		domain::Event::Budget(event) => event.id().to_string(),
		domain::Event::Payment(event) => event.id().to_string(),
		domain::Event::Project(event) => event.id().to_string(),
	}
}
