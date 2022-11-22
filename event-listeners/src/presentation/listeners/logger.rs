use crate::domain::EventListener;
use anyhow::Result;
use async_trait::async_trait;
use domain::Event;
use tracing::info;

pub struct Logger;

#[async_trait]
impl EventListener for Logger {
	async fn on_event(&self, event: &Event) -> Result<()> {
		info!(event = event.to_string(), "📨 Received event");
		Ok(())
	}
}
