mod proto;

use proto as apibara;

mod error;
use error::Error;

pub mod starknet;

use apibara::{
	connect_response::Message as ResponseMessage, node_client::NodeClient, ConnectRequest, Data,
};
use tokio::sync::RwLock;

pub struct Client {
	node_client: RwLock<NodeClient<tonic::transport::Channel>>,
}

impl Client {
	pub fn new(node_client: NodeClient<tonic::transport::Channel>) -> Self {
		Self {
			node_client: RwLock::new(node_client),
		}
	}

	pub async fn connect(node_url: String) -> Result<Self, Error> {
		let node_client = NodeClient::connect(node_url).await?;
		Ok(Self::new(node_client))
	}

	async fn stream_messages(&self) -> Result<Data, Error> {
		let request = ConnectRequest {
			starting_sequence: 0, // TODO: persist indexing state
		};

		let mut response_stream =
			self.node_client.write().await.stream_messages(request).await?.into_inner();

		loop {
			if let Some(message) =
				response_stream.message().await?.and_then(|response| response.message)
			{
				return match message {
					ResponseMessage::Data(data) => Ok(data),
					ResponseMessage::Invalidate(invalidate) => Err(Error::Invalidate {
						sequence: invalidate.sequence,
					}),
				};
			}
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;

	#[tokio::test]
	async fn client_forward_connection_errors() {
		let result = Client::connect(starknet::node_url()).await;
		assert!(result.is_err());
	}
}
