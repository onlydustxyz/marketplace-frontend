use async_trait::async_trait;
use derive_new::new;

use crate::{Message, PublisherError, SubscriberCallbackError};

#[async_trait]
pub trait Listener<E>: Send + Sync {
	async fn on_event(&self, event: E) -> Result<(), SubscriberCallbackError>;
}

#[derive(Debug, new)]
pub struct Publisher<L>(L);

#[async_trait]
impl<E: Message + Send + Sync, L: Listener<E>> crate::Publisher<E> for Publisher<L> {
	async fn publish(&self, message: &E) -> Result<(), PublisherError> {
		self.0
			.on_event(message.clone())
			.await
			.map_err(|e| PublisherError::Send(e.into()))
	}
}
