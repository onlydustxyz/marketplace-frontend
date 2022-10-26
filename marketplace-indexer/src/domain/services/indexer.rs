use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn stop_indexer(&self) -> Result<(), anyhow::Error>;
}
