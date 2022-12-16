use async_trait::async_trait;
use domain::{Event, SubscriberCallbackError};

#[async_trait]
pub trait EventListener: Send + Sync {
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError>;
}
