use async_trait::async_trait;

use super::{Result, User};
use crate::UserId;

#[async_trait]
pub trait Repository: Send + Sync {
	async fn user_by_id(&self, id: &UserId) -> Result<User>;
}
