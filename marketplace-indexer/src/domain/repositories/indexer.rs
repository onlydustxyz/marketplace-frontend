use crate::domain::*;
use async_trait::async_trait;
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Failed while creating indexer `{id}`: {source}")]
	CreateIndexer {
		id: IndexerId,
		source: anyhow::Error,
	},
	#[error("Failed while getting indexer `{id}`: {source}")]
	GetIndexer {
		id: IndexerId,
		source: anyhow::Error,
	},
	#[error("Failed while listing indexers")]
	ListIndexers(#[source] anyhow::Error),
	#[error("Failed while deleting indexer `{id}`: {source}")]
	DeleteIndexer {
		id: IndexerId,
		source: anyhow::Error,
	},
}

type Result<T> = std::result::Result<T, Error>;

#[automock]
#[async_trait]
pub trait Repository {
	async fn create(&self, indexer: &Indexer) -> Result<()>;
	async fn by_id(&self, indexer_id: &IndexerId) -> Result<Option<Indexer>>;
	async fn list(&self) -> Result<Vec<Indexer>>;
	async fn delete(&self, indexer_id: &IndexerId) -> Result<()>;
}
