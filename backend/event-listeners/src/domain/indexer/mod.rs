use std::fmt::Display;

use async_trait::async_trait;

mod error;
pub use error::{Error, IgnoreErrors, Result};

use crate::domain::GithubEvent;

#[async_trait]
pub trait Indexer: Send + Sync {
	type Id: Copy + Display + Send;

	async fn index(&self, id: Self::Id) -> Result<Vec<GithubEvent>>;
}
