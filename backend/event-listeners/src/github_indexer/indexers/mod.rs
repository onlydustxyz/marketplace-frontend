pub mod error;
pub mod issues;
pub mod logged;
pub mod pull_request;
pub mod pull_requests;
pub mod rate_limited;
pub mod repo;
pub mod user;

use std::{
	collections::hash_map::DefaultHasher,
	fmt::{self, Display},
	hash::{Hash, Hasher},
	sync::Arc,
};

use async_trait::async_trait;
use derive_new::new;
use error::Result;

#[async_trait]
pub trait Indexer<Id>: Send + Sync + fmt::Display
where
	Id: Indexable,
{
	async fn index(&self, id: &Id) -> Result<()>;
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

impl<Id, T> fmt::Display for IndexerImpl<Id, T>
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(
			f,
			"Indexer<{},{}>",
			self.crawler.get_name(),
			self.projector.get_name()
		)
	}
}

pub trait Indexable: Clone + Display + Send + Sync {}

impl<I: Clone + Display + Send + Sync> Indexable for I {}

trait Named {
	fn get_name(&self) -> &'static str {
		return std::any::type_name::<Self>();
	}
}

impl<Id, T> Named for dyn Crawler<Id, T>
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
}

impl<Id, T> Named for dyn Projector<Id, T>
where
	Id: Indexable,
	T: Clone + Send + Sync,
{
}

pub fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}
