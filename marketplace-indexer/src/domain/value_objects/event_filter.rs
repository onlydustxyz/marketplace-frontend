use crate::domain::IndexerId;
use marketplace_domain::ContractAddress;

#[derive(PartialEq, Eq, Debug)]
pub struct EventFilter {
	pub indexer_id: IndexerId,
	pub source_contract: ContractAddress,
}
