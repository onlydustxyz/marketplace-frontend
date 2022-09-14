use async_trait::async_trait;
use log::{error, info};
use marketplace_domain::{Event, EventListener};
use url::Url;

const WEBHOOK_TARGET_ENV_VAR: &str = "EVENT_WEBHOOK_TARGET";

pub struct EventWebHook;

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

			let client = reqwest::Client::new();
			if let Err(e) = client.post(target.clone()).json(&event).send().await {
				error!("Failed to send event to hook target '{target}': {e}");
			}
		} else {
			info!("Event webhook ignored: environment variable 'EVENT_WEBHOOK_TARGET' is not set");
		};
	}
}
