use async_trait::async_trait;

use super::Result;
use crate::{GithubUser, GithubUserId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn user_by_id(&self, id: &GithubUserId) -> Result<GithubUser>;
	async fn current_user(&self) -> Result<GithubUser>;
}
