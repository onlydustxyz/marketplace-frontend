use async_trait::async_trait;

use super::Result;
use crate::models::User;

#[async_trait]
pub trait Port: Send + Sync {
	async fn user_by_id(&self, user_id: u64) -> Result<User>;
}
