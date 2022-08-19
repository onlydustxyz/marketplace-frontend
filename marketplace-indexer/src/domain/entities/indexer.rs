use std::fmt::Display;

use crate::domain::*;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Id(String);

impl<T: Into<String>> From<T> for Id {
	fn from(id: T) -> Self {
		Self(id.into())
	}
}

impl Display for Id {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		self.0.fmt(f)
	}
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Indexer {
	pub id: Id,
	pub network: Network,
	pub index_from_block: u64,
	pub filters: Vec<EventFilter>,
}

impl Indexer {
	pub fn new(id: Id, network: Network, index_from_block: u64, filters: Vec<EventFilter>) -> Self {
		Self {
			id,
			network,
			index_from_block,
			filters,
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use marketplace_domain::ContractAddress;
	use std::str::FromStr;

	#[test]
	fn indexer_can_be_created() {
		let indexer = Indexer::new(
			IndexerId::from("123"),
			Network::Starknet(StarknetChain::Devnet),
			42,
			vec![
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event1"),
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event2"),
			],
		);

		assert_eq!(String::from("123"), indexer.id.to_string());
		assert_eq!(Network::Starknet(StarknetChain::Devnet), indexer.network);
		assert_eq!(42, indexer.index_from_block);
		assert_eq!(
			vec![
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event1"),
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "event2"),
			],
			indexer.filters
		);
	}

	#[test]
	fn id_can_be_created_from_and_transformed_into_a_string() {
		assert_eq!("11", Id::from("11").to_string());
		assert_eq!("22", Id::from(String::from("22")).to_string());
	}
}
