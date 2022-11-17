use crate::domain::EventListener;
use anyhow::Result;
use async_trait::async_trait;
use domain::Event;
use tracing::{error, info};

pub struct Logger;

#[async_trait]
impl EventListener for Logger {
	async fn on_event(&self, event: &Event) -> Result<()> {
		match serde_json::to_string_pretty(&event) {
			Ok(event) => info!("[events] 📨 Received event: {event}",),
			Err(error) => error!(
				error = error.to_string(),
				event = format!("{:?}", event),
				"Unable to format event"
			),
		};
		Ok(())
	}
}
