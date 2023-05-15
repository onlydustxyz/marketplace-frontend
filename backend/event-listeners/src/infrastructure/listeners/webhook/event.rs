use anyhow::Result;
use serde::{ser::SerializeStruct, Serialize, Serializer};
use serde_json::json;

pub struct Event(pub domain::Event);

impl Serialize for Event {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: Serializer,
	{
		use serde::ser::Error;

		let mut state = serializer.serialize_struct("Event", 3)?;

		let event_object = json!(self.0)
			.as_object()
			.cloned()
			.ok_or(Error::custom("Event must be an object"))?;

		let aggregate_name = event_object.keys().next().ok_or(Error::custom(
			"Event must have the aggregate name as first level key",
		))?;

		let aggregate_event_object =
			event_object.values().next().and_then(|v| v.as_object()).ok_or(Error::custom(
				"Event must have an object as first level value",
			))?;

		let event_name = aggregate_event_object.keys().next().ok_or(Error::custom(
			"Event must have the event name as second level key",
		))?;

		let payload = aggregate_event_object.values().next().ok_or(Error::custom(
			"Event must have someting as the second level value",
		))?;

		if let Some(env) = environment() {
			state.serialize_field("environment", &env)?;
		}

		state.serialize_field("aggregate_name", aggregate_name)?;
		state.serialize_field("event_name", event_name)?;
		state.serialize_field("payload", payload)?;
		state.end()
	}
}

fn environment() -> Option<String> {
	std::env::var("ENV").ok()
}
