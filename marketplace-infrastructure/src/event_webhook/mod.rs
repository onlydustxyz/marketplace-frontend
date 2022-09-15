#[cfg(test)]
mod tests;

use std::env;

use async_trait::async_trait;
use log::{error, info};
use marketplace_domain::{Event, EventListener};
use url::Url;

const WEBHOOK_TARGET_ENV_VAR: &str = "EVENT_WEBHOOK_TARGET";

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
		.json(&event)
		.send()
		.await
		.map_err(Error::FailToSendRequest)?;
	res.error_for_status().map_err(Error::RespondWithErrorStatusCode)?;

	Ok(())
}
