use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use event_listeners::domain::GithubEvent;
use futures::future::try_join_all;

use super::{Indexable, Result};

#[derive(new)]
pub struct Indexer<Id: Indexable> {
	indexers: Vec<Arc<dyn super::Indexer<Id>>>,
}

#[async_trait]
impl<Id: Indexable + Sync> super::Indexer<Id> for Indexer<Id> {
	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		let handles = self.indexers.iter().map(|indexer| indexer.index(id));
		Ok(try_join_all(handles).await?.into_iter().flatten().collect())
	}
}

pub trait Arced
where
	Self: Sized,
{
	fn arced(self) -> Arc<Self> {
		Arc::new(self)
	}
}

impl<T> Arced for T {}
