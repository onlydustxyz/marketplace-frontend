use marketplace_domain::ContractAddress;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn contract_address_matches(&self, contract_address: &ContractAddress) -> Result<bool, Error>;
}
