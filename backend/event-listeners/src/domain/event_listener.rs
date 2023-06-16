use async_trait::async_trait;
use domain::SubscriberCallbackError;

#[async_trait]
pub trait EventListener<E>: Send + Sync {
	async fn on_event(&self, event: E) -> Result<(), SubscriberCallbackError>;
}
