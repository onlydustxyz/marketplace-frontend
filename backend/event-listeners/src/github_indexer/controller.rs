use std::sync::Arc;

use derive_new::new;

use super::{
	indexers,
	indexers::{error::Result, Indexable},
	repository::Repository,
};

#[derive(new)]
pub struct Controller<Id: Indexable> {
	repository: Arc<dyn Repository<Id>>,
	indexers: Vec<Arc<dyn indexers::Indexer<Id>>>,
}

impl<Id: Indexable> Controller<Id> {
	pub async fn index_all(&self) -> Result<()> {
		let ids = self.repository.list_items_to_index()?;
		for id in ids {
			self.index(&id).await?;
		}
		Ok(())
	}

	async fn index(&self, id: &Id) -> Result<()> {
		for indexer in &self.indexers {
			indexer.index(id).await?;
		}
		Ok(())
	}
}
