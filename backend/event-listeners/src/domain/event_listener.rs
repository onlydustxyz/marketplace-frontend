use anyhow::Result;
use async_trait::async_trait;
use domain::Event;

#[async_trait]
pub trait EventListener: Send + Sync {
	async fn on_event(&self, event: &Event) -> Result<()>;
}
