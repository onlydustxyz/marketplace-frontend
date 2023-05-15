use std::env;

use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, SubscriberCallbackError};
use olog::{error, info};
use tracing::instrument;
use url::Url;

use crate::domain::EventListener;

mod event;
use event::Event as WebHookEvent;

const WEBHOOK_TARGET_ENV_VAR: &str = "EVENT_WEBHOOK_TARGET";

pub struct EventWebHook {
	client: reqwest::Client,
}

impl EventWebHook {
	pub fn new(client: reqwest::Client) -> Self {
		Self { client }
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
impl EventListener<Event> for EventWebHook {
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match send_event_to_webhook(&self.client, event).await {
			Ok(()) => {},
			Err(e) => match e {
				Error::EnvVarNotSet(_) => info!(
					"Event webhook ignored: environment variable '{WEBHOOK_TARGET_ENV_VAR}' is not set"
				),
				Error::InvalidEnvVar(e) => error!(
					"Failed to parse environment variable '{WEBHOOK_TARGET_ENV_VAR}' content to Url: {e}"
				),
				Error::FailToSendRequest(e) => error!("Failed to send event to hook target: {e}"),
				Error::RespondWithErrorStatusCode(e) => {
					error!("WebHook target failed to process event: {e}")
				},
			},
		};
		Ok(())
	}
}

#[instrument(skip(client))]
async fn send_event_to_webhook(client: &reqwest::Client, event: &Event) -> Result<(), Error> {
	let env_var = std::env::var(WEBHOOK_TARGET_ENV_VAR).map_err(Error::EnvVarNotSet)?;
	let target = Url::parse(&env_var).map_err(Error::InvalidEnvVar)?;
	let res = client
		.post(target.clone())
		.json(&WebHookEvent(event.to_owned()))
		.send()
		.await
		.map_err(Error::FailToSendRequest)?;
	res.error_for_status().map_err(Error::RespondWithErrorStatusCode)?;

	Ok(())
}

#[cfg(test)]
mod tests {
	use std::ffi::OsString;

	use assert_matches::assert_matches;
	use domain::{ProjectEvent, ProjectId};
	use envtestkit::{
		lock::{lock_read, lock_test},
		set_env,
	};
	use mockito;
	use rstest::*;
	use serde_json::json;

	use super::*;

	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		uuid::Uuid::new_v4().into()
	}

	#[fixture]
	fn project_created_event(project_id: &ProjectId) -> ProjectEvent {
		ProjectEvent::Created { id: *project_id }
	}

	#[allow(clippy::await_holding_lock)]
	#[rstest]
	async fn env_variable_not_set(project_created_event: ProjectEvent) {
		let _lock = lock_read();

		let event: Event = project_created_event.into();

		assert_matches!(
			send_event_to_webhook(&reqwest::Client::new(), &event).await,
			Err(Error::EnvVarNotSet(_))
		);
	}

	#[allow(clippy::await_holding_lock)]
	#[rstest]
	async fn env_variable_invalid(project_created_event: ProjectEvent) {
		let _lock = lock_test();
		let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), "Some random junk");

		let event: Event = project_created_event.into();

		assert_matches!(
			send_event_to_webhook(&reqwest::Client::new(), &event).await,
			Err(Error::InvalidEnvVar(_))
		);
	}

	#[allow(clippy::await_holding_lock)]
	#[rstest]
	#[tokio::test]
	async fn http_call_fail(project_created_event: ProjectEvent) {
		let server_url = mockito::server_url();
		let _m = mockito::mock("POST", "/webhook").with_status(400).expect(1).create();

		let mut target_url = server_url.clone();
		target_url.push_str("/webhook");

		let _lock = lock_test();
		let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), &target_url);

		let event: Event = project_created_event.into();

		assert_matches!(
			send_event_to_webhook(&reqwest::Client::new(), &event).await,
			Err(Error::RespondWithErrorStatusCode(_))
		);

		assert!(_m.matched());
	}

	#[rstest]
	fn webhook_event_serialize(project_created_event: ProjectEvent, project_id: &ProjectId) {
		let event: Event = project_created_event.into();
		let json_value = serde_json::to_value(Event::from(event)).unwrap();

		let expected_json_value = json!({
			"aggregate_name":"Project",
			"event_name":"Created",
			"payload":{
				"id": project_id.to_string(),
			}
		});

		assert_eq!(json_value, expected_json_value);
	}
}
