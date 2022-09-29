use crate::domain::IndexerId;
use marketplace_domain::ContractAddress;

pub struct EventFilter {
	pub indexer_id: IndexerId,
	pub source_contract: ContractAddress,
}
