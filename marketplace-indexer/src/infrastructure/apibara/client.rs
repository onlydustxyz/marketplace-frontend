use super::proto::{
	node_client::NodeClient, stream_messages_response::Message as ResponseMessage,
	StreamMessagesRequest,
};
use crate::domain::BlockchainObserver;
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
}

pub struct Client<OBS: BlockchainObserver> {
	node_url: String,
	observer: OBS,
}

impl<OBS: BlockchainObserver> Client<OBS> {
	pub fn new<STR: ToString>(node_url: STR, observer: OBS) -> Self {
		Self {
			node_url: node_url.to_string(),
			observer,
		}
	}

	pub async fn connect(self) -> Result<ConnectedClient<OBS>, Error> {
		let node_client = NodeClient::connect(self.node_url).await?;
		self.observer.on_connect().await;
		Ok(ConnectedClient {
			node_client: RwLock::new(node_client),
			observer: self.observer,
		})
	}
}

pub struct ConnectedClient<O: BlockchainObserver> {
	node_client: RwLock<NodeClient<tonic::transport::Channel>>,
	pub(super) observer: O,
}

impl<O: BlockchainObserver> ConnectedClient<O> {
	pub(super) async fn stream_messages<RESULT>(
		&self,
		starting_sequence: u64,
		callback: impl Fn(ResponseMessage) -> RESULT,
	) -> Result<(), Error>
	where
		RESULT: Future<Output = Result<(), anyhow::Error>>,
	{
		let request = StreamMessagesRequest { starting_sequence };

		let mut response_stream =
			self.node_client.write().await.stream_messages(request).await?.into_inner();

		loop {
			if let Some(message) =
				response_stream.message().await?.and_then(|response| response.message)
			{
				callback(message).await?;
			}
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::domain::MockBlockchainObserver;
	use rstest::*;

	#[fixture]
	fn observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[rstest]
	#[tokio::test]
	async fn client_forward_connection_errors(observer: MockBlockchainObserver) {
		let result = Client::new("http://localhost", observer).connect().await;
		assert!(result.is_err());
	}
}
