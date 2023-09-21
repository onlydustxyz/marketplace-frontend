use async_trait::async_trait;

use crate::SubscriberCallbackError;

#[async_trait]
pub trait Listener<E>: Send + Sync {
	async fn on_event(&self, event: E) -> Result<(), SubscriberCallbackError>;
}
