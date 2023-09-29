use super::Result;
use crate::models::*;

#[async_trait]
pub trait Port: Send + Sync {
	async fn social_accounts_by_userid(&self, userid: UserId) -> Result<SocialAccounts>;
	async fn social_accounts_by_username(&self, username: String) -> Result<SocialAccounts>;
}
