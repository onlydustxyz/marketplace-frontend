use std::fmt::Display;

use async_trait::async_trait;

mod error;
pub use error::{Error, IgnoreErrors, Result};

use crate::domain::GithubEvent;

#[async_trait]
pub trait Indexer<Id>: Send + Sync
where
	Id: Indexable,
{
	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>>;
}

pub trait Indexable: Copy + Display + Send {}

impl<I: Copy + Display + Send> Indexable for I {}
