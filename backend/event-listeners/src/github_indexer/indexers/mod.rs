pub mod error;
mod issues;
mod pull_request;
mod pull_requests;
mod repo;

use std::{
	collections::hash_map::DefaultHasher,
	fmt::Display,
	hash::{Hash, Hasher},
};

use async_trait::async_trait;
use error::Result;
pub use issues::IssuesIndexer;
pub use pull_requests::PullRequestsIndexer;
pub use repo::RepoIndexer;

#[async_trait]
pub trait Indexer<Id, T>: Crawler<Id, T> + Projector<Id, T> + Send + Sync
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
	async fn index(&self, id: &Id) -> Result<()> {
		let data = self.fetch_modified_data(id).await?;
		self.perform_projections(id, data.clone()).await?;
		self.ack(id, data)?;
		Ok(())
	}
}

impl<Id, T, I> Indexer<Id, T> for I
where
	Id: Indexable,
	T: Clone + Send + Sync,
	I: Crawler<Id, T> + Projector<Id, T> + Send + Sync,
{
}

#[async_trait]
pub trait Crawler<Id, T>: Send + Sync
where
	Id: Indexable,
{
	async fn fetch_modified_data(&self, id: &Id) -> Result<T>;
	fn ack(&self, id: &Id, data: T) -> Result<()>;
}

#[async_trait]
pub trait Projector<Id, T>: Send + Sync
where
	Id: Indexable,
{
	async fn perform_projections(&self, id: &Id, data: T) -> Result<()>;
}

pub trait Indexable: Clone + Display + Send + Sync {}

impl<I: Clone + Display + Send + Sync> Indexable for I {}

pub fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}
