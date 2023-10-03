use super::Result;
use crate::models::*;

#[async_trait]
pub trait Port: Send + Sync {
	async fn user_by_id(&self, user_id: UserId) -> Result<User>;
	async fn user_by_name(&self, username: String) -> Result<User>;

	async fn user_social_accounts_by_id(&self, user_id: UserId) -> Result<Vec<SocialAccount>>;
}
