use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use futures::future::try_join_all;
use itertools::Itertools;

use super::{Indexable, Result};
use crate::listeners::github::Event as GithubEvent;

#[derive(new)]
pub struct Indexer<Id: Indexable> {
	indexers: Vec<Arc<dyn super::Indexer<Id>>>,
}

#[async_trait]
impl<Id: Indexable + Sync> super::Indexer<Id> for Indexer<Id> {
	fn name(&self) -> String {
		self.indexers.iter().map(|i| i.name()).join(",")
	}

	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>> {
		let handles = self.indexers.iter().map(|indexer| indexer.index(id.clone()));
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
