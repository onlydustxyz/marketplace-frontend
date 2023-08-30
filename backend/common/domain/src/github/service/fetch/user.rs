use async_trait::async_trait;

use super::Result;
use crate::{GithubFullUser, GithubUser, GithubUserId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn current_user(&self) -> Result<GithubUser>;
	async fn full_user_by_id(&self, id: &GithubUserId) -> Result<GithubFullUser>;
}
