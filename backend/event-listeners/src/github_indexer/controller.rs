use std::sync::Arc;

use derive_new::new;
use domain::LogErr;
use olog::{error, IntoField};

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
			self.index(&id).await;
		}
		Ok(())
	}

	async fn index(&self, id: &Id) {
		for indexer in &self.indexers {
			indexer
				.index(id)
				.await
				.log_err(|error| {
					error!(
						error = error.to_field(),
						indexed_item_id = id.to_string(),
						indexed_item_id_type = std::any::type_name::<Id>(),
						indexer_type = indexer.as_ref().to_string(),
						"An error occurred while indexing item. Continuing indexation..."
					)
				})
				.ok();
		}
	}
}
