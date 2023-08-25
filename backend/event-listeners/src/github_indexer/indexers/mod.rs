pub mod error;
pub mod issues;
pub mod pull_request;
pub mod pull_requests;
pub mod repo;
pub mod user;

use std::{
	collections::hash_map::DefaultHasher,
	fmt::Display,
	hash::{Hash, Hasher},
	sync::Arc,
};

use async_trait::async_trait;
use derive_new::new;
use error::Result;

#[async_trait]
pub trait Indexer<Id>: Send + Sync
where
	Id: Indexable,
{
	async fn index(&self, id: &Id) -> Result<()>;
}

#[derive(new)]
pub struct IndexerImpl<Id, T>
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
	crawler: Arc<dyn Crawler<Id, T>>,
	projector: Arc<dyn Projector<Id, T>>,
}

#[async_trait]
impl<Id, T> Indexer<Id> for IndexerImpl<Id, T>
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
	async fn index(&self, id: &Id) -> Result<()> {
		let data = self.crawler.fetch_modified_data(id).await?;
		self.projector.perform_projections(id, data.clone()).await?;
		self.crawler.ack(id, data)?;
		Ok(())
	}
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
