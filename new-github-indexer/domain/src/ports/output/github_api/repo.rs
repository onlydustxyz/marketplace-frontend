use async_trait::async_trait;

use super::Result;
use crate::models::Repository;

#[async_trait]
pub trait Port: Send + Sync {
	async fn repo_by_id(&self, repo_id: u64) -> Result<Repository>;
}
