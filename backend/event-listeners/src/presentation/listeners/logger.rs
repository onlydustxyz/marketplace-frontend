use anyhow::Result;
use async_trait::async_trait;
use domain::SubscriberCallbackError;
use olog::info;

use crate::domain::EventListener;

pub struct Logger;

#[async_trait]
impl<E: ToString + Sync> EventListener<E> for Logger {
	async fn on_event(&self, event: &E) -> Result<(), SubscriberCallbackError> {
		info!(event = event.to_string(), "📨 Received event");
		Ok(())
	}
}
