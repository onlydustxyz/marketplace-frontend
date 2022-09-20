mod proto;

use proto as apibara;

mod error;
use error::Error;

pub mod starknet;

use crate::domain::BlockchainObserver;
use apibara::{
	connect_response::Message as ResponseMessage, node_client::NodeClient, ConnectRequest,
};
use tokio::sync::RwLock;

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
	observer: O,
}

impl<O: BlockchainObserver> ConnectedClient<O> {
	async fn stream_messages(&self) -> Result<ResponseMessage, Error> {
		let request = ConnectRequest {
			starting_sequence: 0, // TODO: persist indexing state
		};

		let mut response_stream =
			self.node_client.write().await.stream_messages(request).await?.into_inner();

		loop {
			if let Some(message) =
				response_stream.message().await?.and_then(|response| response.message)
			{
				return Ok(message);
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
	async fn client_forward_connection_errors(observer: MockBlockchainObserver) {
		let result = Client::new("http://localhost", observer).connect().await;
		assert!(result.is_err());
	}
}
