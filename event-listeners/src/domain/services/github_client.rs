use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

pub type UserId = u64;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct User {
	pub id: UserId,
	pub name: String,
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait GithubClient: Send + Sync {
	async fn find_user_by_id(&self, user_id: UserId) -> Result<User, Error>;
}
