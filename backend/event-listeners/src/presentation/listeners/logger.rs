use anyhow::Result;
use async_trait::async_trait;
use domain::SubscriberCallbackError;
use olog::info;
use serde_json::Value;

use crate::domain::EventListener;

pub struct Logger;

#[async_trait]
impl EventListener<Value> for Logger {
	async fn on_event(&self, event: &Value) -> Result<(), SubscriberCallbackError> {
		info!(event = event.to_string(), "📨 Received event");
		Ok(())
	}
}
