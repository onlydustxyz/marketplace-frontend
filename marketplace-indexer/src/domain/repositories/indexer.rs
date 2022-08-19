use crate::domain::*;
use async_trait::async_trait;
use mockall::automock;
use thiserror::Error as ThisError;

#[derive(ThisError, Debug)]
pub enum Error {
	#[error("unable to connect to the indexing service")]
	Connection(#[from] Box<dyn std::error::Error>),
	#[error("unable to create the indexer `{id}`: {details}")]
	CreateIndexer { id: IndexerId, details: String },
	#[error("unable to get the indexer `{id}`: {details}")]
	GetIndexer { id: IndexerId, details: String },
	#[error("unable to delete the indexer `{id}`: {details}")]
	DeleteIndexer { id: IndexerId, details: String },
}

type Result<T> = std::result::Result<T, Error>;

#[automock]
#[async_trait]
pub trait Repository {
	async fn create(&self, indexer: &Indexer) -> Result<()>;
	async fn by_id(&self, indexer_id: &IndexerId) -> Result<Option<Indexer>>;
	async fn delete(&self, indexer_id: &IndexerId) -> Result<()>;
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	#[case(Error::CreateIndexer{id: IndexerId::from("ID"), details: String::from("details")}, "unable to create the indexer `ID`: details")]
	#[case(Error::GetIndexer{id: IndexerId::from("ID"), details: String::from("details")}, "unable to get the indexer `ID`: details")]
	#[case(Error::DeleteIndexer{id: IndexerId::from("ID"), details: String::from("details")}, "unable to delete the indexer `ID`: details")]
	fn error_messages_are_well_formatted(#[case] error: Error, #[case] expected_message: &str) {
		assert_eq!(expected_message, error.to_string());
	}
}
