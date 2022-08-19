mod proto;

use proto as apibara;

mod error;
use error::Error;

mod events;
mod indexer_repository;
mod indexing_service;

use apibara::indexer_manager_client::IndexerManagerClient;
use tokio::sync::RwLock;

pub struct Client(RwLock<IndexerManagerClient<tonic::transport::Channel>>);

impl Client {
	pub fn new(inner: IndexerManagerClient<tonic::transport::Channel>) -> Self {
		Self(RwLock::new(inner))
	}

	pub async fn default() -> Result<Self, Error> {
		let inner = IndexerManagerClient::connect(apibara_url()).await.map_err(Error::from)?;
		Ok(Self::new(inner))
	}
}

fn apibara_url() -> String {
	std::env::var("APIBARA_URL").expect("APIBARA_URL must be set")
}

#[cfg(test)]
mod test {
	use super::*;

	#[tokio::test]
	async fn client_forward_connection_errors() {
		std::env::set_var("APIBARA_URL", "");
		let result = Client::default().await;
		assert!(result.is_err());
	}
}
