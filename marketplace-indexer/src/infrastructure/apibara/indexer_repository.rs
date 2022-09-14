use super::{
	apibara::{
		self, CreateIndexerRequest, DeleteIndexerRequest, GetIndexerRequest, ListIndexerRequest,
	},
	Client,
};
use crate::domain::*;
use anyhow::anyhow;
use async_trait::async_trait;
use itertools::Itertools;

/**
 * Implementation of the Client trait for apibara
 */
#[async_trait]
impl IndexerRepository for Client {
	async fn create(&self, indexer: &Indexer) -> Result<(), IndexerRepositoryError> {
		let response = self
			.0
			.write()
			.await
			.create_indexer(CreateIndexerRequest {
				id: indexer.id.to_string(),
				network_name: indexer.network.to_string(),
				index_from_block: indexer.index_from_block,
				filters: indexer.clone().filters.into_iter().map_into().collect(),
			})
			.await
			.map_err(|status| IndexerRepositoryError::CreateIndexer {
				id: indexer.id.clone(),
				source: anyhow!(status),
			})?;

		response
			.into_inner()
			.indexer
			.ok_or_else(|| IndexerRepositoryError::CreateIndexer {
				id: indexer.id.clone(),
				source: anyhow!("Indexer not created"),
			})?;

		Ok(())
	}

	async fn by_id(
		&self,
		indexer_id: &IndexerId,
	) -> Result<Option<Indexer>, IndexerRepositoryError> {
		let response = self
			.0
			.write()
			.await
			.get_indexer(GetIndexerRequest {
				id: indexer_id.to_string(),
			})
			.await
			.map_err(|status| IndexerRepositoryError::GetIndexer {
				id: indexer_id.clone(),
				source: anyhow!(status),
			})?;

		Ok(response.into_inner().indexer.map(Indexer::from))
	}

	async fn list(&self) -> Result<Vec<Indexer>, IndexerRepositoryError> {
		let response = self
			.0
			.write()
			.await
			.list_indexer(ListIndexerRequest {})
			.await
			.map_err(|status| IndexerRepositoryError::ListIndexers(anyhow!(status)))?;

		Ok(response.into_inner().indexers.into_iter().map_into().collect())
	}

	async fn delete(&self, indexer_id: &IndexerId) -> Result<(), IndexerRepositoryError> {
		self.0
			.write()
			.await
			.delete_indexer(DeleteIndexerRequest {
				id: indexer_id.to_string(),
			})
			.await
			.map_err(|status| IndexerRepositoryError::DeleteIndexer {
				id: indexer_id.clone(),
				source: anyhow!(status),
			})?;

		Ok(())
	}
}

// Hardcoded strings are referenced in the server configuration.toml file
impl ToString for Network {
	fn to_string(&self) -> String {
		match self {
			Network::Starknet => "starknet",
		}
		.to_string()
	}
}

impl From<EventFilter> for apibara::EventFilter {
	fn from(filter: EventFilter) -> Self {
		Self {
			address: filter.contract_address.to_bytes(),
			signature: filter.event_name,
		}
	}
}

impl From<apibara::Network> for Network {
	fn from(network: apibara::Network) -> Self {
		match network.network {
			Some(network) => match network {
				apibara::network::Network::Starknet(_) => Network::Starknet,
				apibara::network::Network::Ethereum(_) => unimplemented!(),
			},
			None => Network::Starknet,
		}
	}
}

impl From<apibara::EventFilter> for EventFilter {
	fn from(filter: apibara::EventFilter) -> Self {
		Self {
			contract_address: filter.address.into(),
			event_name: filter.signature,
		}
	}
}

impl From<apibara::Indexer> for Indexer {
	fn from(indexer: apibara::Indexer) -> Self {
		Self {
			id: indexer.id.into(),
			network: indexer.network.map(|network| network.into()).unwrap_or_default(),
			index_from_block: indexer.index_from_block,
			filters: indexer.filters.into_iter().map_into().collect(),
		}
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use super::*;
	use marketplace_domain::ContractAddress;
	use rstest::*;

	#[test]
	fn network_to_apibara_string() {
		assert_eq!("starknet", Network::Starknet.to_string());
	}

	#[rstest]
	fn network_from_apibara() {
		assert_eq!(
			Network::Starknet,
			Network::from(apibara::Network {
				network: Some(apibara::network::Network::Starknet(
					apibara::StarkNetNetwork {
						name: String::from("starknet")
					}
				))
			})
		)
	}

	#[test]
	fn network_from_apibara_should_default_if_not_provided() {
		assert_eq!(
			Network::default(),
			Network::from(apibara::Network { network: None })
		);
	}

	#[test]
	#[should_panic(expected = "not implemented")]
	fn network_from_apibara_should_panic_for_unimplemented() {
		let _ = Network::from(apibara::Network {
			network: Some(apibara::network::Network::Ethereum(
				apibara::EthereumNetwork {
					name: String::from(""),
				},
			)),
		});
	}

	#[test]
	fn event_filter_from_domain() {
		let filter = apibara::EventFilter::from(EventFilter {
			contract_address: ContractAddress::from_str(
				"0x04e16efc9bc2d8d40ecb73d3d69e3e2d6f0fc3e2e6e9b7601310fdfa7dd6c7cf",
			)
			.unwrap(),
			event_name: "GithubUserRegistered".to_owned(),
		});

		assert_eq!(
			vec![
				4, 225, 110, 252, 155, 194, 216, 212, 14, 203, 115, 211, 214, 158, 62, 45, 111, 15,
				195, 226, 230, 233, 183, 96, 19, 16, 253, 250, 125, 214, 199, 207
			],
			filter.address
		);
		assert_eq!("GithubUserRegistered", filter.signature);
	}

	#[test]
	fn event_filter_from_apibara() {
		let filter = EventFilter::from(apibara::EventFilter {
			address: vec![
				4, 225, 110, 252, 155, 194, 216, 212, 14, 203, 115, 211, 214, 158, 62, 45, 111, 15,
				195, 226, 230, 233, 183, 96, 19, 16, 253, 250, 125, 214, 199, 207,
			],
			signature: String::from("GithubUserRegistered"),
		});

		assert_eq!(
			ContractAddress::from_str(
				"0x04e16efc9bc2d8d40ecb73d3d69e3e2d6f0fc3e2e6e9b7601310fdfa7dd6c7cf"
			)
			.unwrap(),
			filter.contract_address
		);
		assert_eq!("GithubUserRegistered", filter.event_name);
	}

	#[test]
	fn indexer_from_apibara() {
		let indexer = Indexer::from(apibara::Indexer {
			id: String::from("ID"),
			network: Some(apibara::Network {
				network: Some(apibara::network::Network::Starknet(
					apibara::StarkNetNetwork {
						name: String::from("starknet"),
					},
				)),
			}),
			index_from_block: 1234,
			filters: vec![
				apibara::EventFilter {
					address: vec![18, 52],
					signature: String::from("event1"),
				},
				apibara::EventFilter {
					address: vec![18, 52],
					signature: String::from("event2"),
				},
			],
			..Default::default()
		});

		let expected_indexer = Indexer::new(
			IndexerId::from("ID"),
			Network::Starknet,
			1234,
			vec![
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event1"),
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event2"),
			],
		);

		assert_eq!(expected_indexer, indexer);
	}

	#[test]
	fn indexer_from_apibara_with_no_network() {
		let indexer = Indexer::from(apibara::Indexer::default());
		let expected_indexer = Indexer::default();
		assert_eq!(expected_indexer, indexer);
	}
}
