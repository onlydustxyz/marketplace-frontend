use async_trait::async_trait;
use marketplace_domain::{Event, EventListener};
use tracing::info;

pub struct Logger;

#[async_trait]
impl EventListener for Logger {
	async fn on_event(&self, event: &Event) {
		info!(
			"[events] 📨 Received event: {}",
			&serde_json::to_string_pretty(&event).expect("Unable to format event")
		);
	}
}
