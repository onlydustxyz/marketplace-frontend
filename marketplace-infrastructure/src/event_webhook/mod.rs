#[cfg(test)]
mod tests;

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

#[async_trait]
impl EventListener for EventWebHook {
	async fn on_event(&self, event: &Event) {
		if let Some(target) = std::env::var(WEBHOOK_TARGET_ENV_VAR).ok() {
			let target = match Url::parse(&target) {
				Ok(url) => url,
				Err(e) => {
					error!(
						"Failed to parse environment variable '{WEBHOOK_TARGET_ENV_VAR}' content to Url: {e}"
					);
					return;
				},
			};

			match self.web_client.post(target.clone()).json(&event).send().await {
				Ok(res) =>
					if let Err(e) = res.error_for_status() {
						error!("WebHook target failed to process event: {e}");
					},
				Err(e) => error!("Failed to send event to hook target '{target}': {e}"),
			}
		} else {
			info!(
				"Event webhook ignored: environment variable '{WEBHOOK_TARGET_ENV_VAR}' is not set"
			);
		};
	}
}
