use async_trait::async_trait;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

pub type UserId = u64;

#[automock]
#[async_trait]
pub trait GithubClient: Send + Sync {
	async fn authenticate_user(&self, authorization_code: String) -> Result<UserId, Error>;
}
