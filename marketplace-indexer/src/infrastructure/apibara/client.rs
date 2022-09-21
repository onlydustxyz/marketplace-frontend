use std::sync::Arc;

use super::proto::{
	node_client::NodeClient, stream_messages_response::Message as ResponseMessage,
	StreamMessagesRequest,
};
use crate::domain::{
	BlockchainObserver, Indexer, IndexerId, IndexerRepository, IndexerRepositoryError,
};
use futures::Future;
use tokio::sync::RwLock;

use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Connect(#[from] tonic::transport::Error),
	#[error(transparent)]
	Stream(#[from] tonic::Status),
	#[error("Failed while observing blockchain events")]
	Observe(#[from] anyhow::Error),
	#[error(transparent)]
	IndexerRepository(#[from] IndexerRepositoryError),
}

pub struct Client<OBS: BlockchainObserver> {
	node_url: String,
	observer: OBS,
	indexer_repository: Arc<dyn IndexerRepository>,
}

impl<OBS: BlockchainObserver> Client<OBS> {
	pub fn new<STR: ToString>(
		node_url: STR,
		observer: OBS,
		indexer_repository: Arc<dyn IndexerRepository>,
	) -> Self {
		Self {
			node_url: node_url.to_string(),
			observer,
			indexer_repository,
		}
	}

	pub async fn connect(self) -> Result<ConnectedClient<OBS>, Error> {
		let node_client = NodeClient::connect(self.node_url).await?;
		self.observer.on_connect().await;
		Ok(ConnectedClient {
			node_client: RwLock::new(node_client),
			observer: self.observer,
			indexer_repository: self.indexer_repository,
		})
	}
}

pub struct ConnectedClient<OBS: BlockchainObserver> {
	node_client: RwLock<NodeClient<tonic::transport::Channel>>,
	pub(super) observer: OBS,
	pub(super) indexer_repository: Arc<dyn IndexerRepository>,
}

impl<OBS: BlockchainObserver> ConnectedClient<OBS> {
	pub(super) async fn stream_messages<RESULT, ID>(
		&self,
		indexer_id: ID,
		callback: impl Fn(ResponseMessage) -> RESULT,
	) -> Result<(), Error>
	where
		RESULT: Future<Output = Result<(), anyhow::Error>>,
		ID: Into<IndexerId>,
	{
		let indexer_id: IndexerId = indexer_id.into();
		let mut indexer = match self.indexer_repository.find_by_id(&indexer_id) {
			Ok(indexer) => indexer,
			Err(IndexerRepositoryError::NotFound) => Indexer::new(indexer_id, 0),
			Err(error) => return Err(error.into()),
		};

		let request = StreamMessagesRequest {
			starting_sequence: indexer.index_head,
		};

		let mut response_stream =
			self.node_client.write().await.stream_messages(request).await?.into_inner();

		loop {
			if let Some(message) =
				response_stream.message().await?.and_then(|response| response.message)
			{
				callback(message).await?;
				indexer.index_head += 1;
				self.indexer_repository.store(indexer.clone())?;
			}
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::domain::{MockBlockchainObserver, MockIndexerRepository};
	use rstest::*;

	#[fixture]
	fn observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[fixture]
	fn indexer_repository() -> MockIndexerRepository {
		MockIndexerRepository::new()
	}

	#[rstest]
	#[tokio::test]
	async fn client_forward_connection_errors(
		observer: MockBlockchainObserver,
		indexer_repository: MockIndexerRepository,
	) {
		let result = Client::new("http://localhost", observer, Arc::new(indexer_repository))
			.connect()
			.await;
		assert!(result.is_err());
	}
}
