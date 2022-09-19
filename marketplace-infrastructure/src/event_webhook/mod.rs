#[cfg(test)]
mod tests;

use std::env;

use async_trait::async_trait;
use log::{error, info};
use marketplace_domain::{Event, EventListener};
use serde::{ser::SerializeStruct, Serialize, Serializer};
use serde_json::json;
use url::Url;

const WEBHOOK_TARGET_ENV_VAR: &str = "EVENT_WEBHOOK_TARGET";

pub struct WebhookEvent(Event);

impl WebhookEvent {
	pub fn new(event: Event) -> Self {
		Self(event)
	}
}

impl Serialize for WebhookEvent {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: Serializer,
	{
		let mut state = serializer.serialize_struct("Event", 3)?;
		let event_object = json!(self.0).as_object().expect("Event must be an object").clone();
		let aggregate_name = event_object
			.keys()
			.next()
			.expect("Event must have the aggregate name as first level key");
		let aggregate_event_object = event_object
			.values()
			.next()
			.expect("Event must have someting as the first level value")
			.as_object()
			.expect("Event must have an object as first level value");
		let event_name = aggregate_event_object
			.keys()
			.next()
			.expect("Event must have the event name as second level key");
		let payload = aggregate_event_object
			.values()
			.next()
			.expect("Event must have someting as the second level value");

		state.serialize_field("aggregate_name", aggregate_name)?;
		state.serialize_field("event_name", event_name)?;
		state.serialize_field("payload", payload)?;
		state.end()
	}
}

pub struct EventWebHook {
	web_client: reqwest::Client,
}

impl EventWebHook {
	pub fn new(client: reqwest::Client) -> Self {
		Self { web_client: client }
	}
}

#[derive(Debug)]
enum Error {
	EnvVarNotSet(env::VarError),
	InvalidEnvVar(url::ParseError),
	FailToSendRequest(reqwest::Error),
	RespondWithErrorStatusCode(reqwest::Error),
}

#[async_trait]
impl EventListener for EventWebHook {
	async fn on_event(&self, event: &Event) {
		match send_event_to_webhook(&self.web_client, event).await {
			Ok(()) => {},
			Err(e) => match e {
				Error::EnvVarNotSet(_) => info!(
					"Event webhook ignored: environment variable '{WEBHOOK_TARGET_ENV_VAR}' is not set"
				),
				Error::InvalidEnvVar(e) => error!(
					"Failed to parse environment variable '{WEBHOOK_TARGET_ENV_VAR}' content to Url: {e}"
				),
				Error::FailToSendRequest(e) => error!("Failed to send event to hook target: {e}"),
				Error::RespondWithErrorStatusCode(e) =>
					error!("WebHook target failed to process event: {e}"),
			},
		}
	}
}

async fn send_event_to_webhook(client: &reqwest::Client, event: &Event) -> Result<(), Error> {
	let env_var = std::env::var(WEBHOOK_TARGET_ENV_VAR).map_err(Error::EnvVarNotSet)?;
	let target = Url::parse(&env_var).map_err(Error::InvalidEnvVar)?;
	let res = client
		.post(target.clone())
		.json(&WebhookEvent::new(event.to_owned()))
		.send()
		.await
		.map_err(Error::FailToSendRequest)?;
	res.error_for_status().map_err(Error::RespondWithErrorStatusCode)?;

	Ok(())
}
