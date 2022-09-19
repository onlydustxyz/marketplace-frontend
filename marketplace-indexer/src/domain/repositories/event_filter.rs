use crate::domain::EventFilter;
use marketplace_domain::ContractAddress;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn find_by_contract_address(
		&self,
		contract_address: &ContractAddress,
	) -> Result<EventFilter, Error>;
}
