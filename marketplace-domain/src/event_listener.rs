use async_trait::async_trait;
use mockall::automock;

use crate::Event;

#[automock]
#[async_trait]
pub trait EventListener: Send + Sync {
	async fn on_event(&self, event: &Event);
}
