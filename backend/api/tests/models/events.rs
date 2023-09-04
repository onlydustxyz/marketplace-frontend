use chrono::NaiveDateTime;
use diesel::RunQueryDsl;
use domain::{AggregateEvent, CommandId};
use infrastructure::{amqp::UniqueMessage, database::schema::events, event_store::NamedAggregate};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::context::Context;

#[derive(Debug, Serialize, Deserialize, Insertable)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub metadata: Value,
	pub command_id: Option<CommandId>,
}

#[allow(unused)]
pub fn store<E: Serialize + Clone + AggregateEvent<A>, A: NamedAggregate>(
	context: &Context,
	events: Vec<E>,
) -> anyhow::Result<()> {
	let events: Vec<_> = events
		.into_iter()
		.map(UniqueMessage::new)
		.map(|m| Event {
			timestamp: *m.timestamp(),
			aggregate_name: A::name(),
			aggregate_id: m.payload().aggregate_id().to_string(),
			payload: serde_json::to_value(m.payload()).expect("Invalid payload"),
			metadata: m.metadata().clone(),
			command_id: m.command_id().map(Into::into),
		})
		.collect();

	diesel::insert_into(events::table)
		.values(events)
		.execute(&mut *context.database.client.connection()?)?;

	Ok(())
}
