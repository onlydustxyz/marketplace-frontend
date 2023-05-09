use std::{fmt::Display, sync::Arc};

use async_trait::async_trait;
use derive_new::new;
use event_listeners::domain::GithubEvent;
use futures::future::try_join_all;

use super::Result;

#[derive(new)]
pub struct Indexer<ID> {
	indexers: Vec<Arc<dyn super::Indexer<Id = ID>>>,
}

#[async_trait]
impl<ID: Copy + Display + Send + Sync> super::Indexer for Indexer<ID> {
	type Id = ID;

	async fn index(&self, id: Self::Id) -> Result<Vec<GithubEvent>> {
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
