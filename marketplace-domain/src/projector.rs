use async_trait::async_trait;

use crate::{Event, Projection};

#[async_trait]
pub trait EventHandler<P: Projection>: Send + Sync {
	async fn handle(&self, event: &Event);
}
