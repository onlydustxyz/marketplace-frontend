use async_trait::async_trait;

use super::Result;
use crate::{GithubUser, GithubUserId};

#[async_trait]
pub trait Service: Send + Sync {
	async fn user(&self, username: &str) -> Result<GithubUser>;
	async fn user_by_id(&self, id: &GithubUserId) -> Result<GithubUser>;
}
