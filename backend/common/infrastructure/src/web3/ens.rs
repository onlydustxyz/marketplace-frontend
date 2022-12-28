use anyhow::anyhow;
use domain::EthereumAddress;
use thiserror::Error;
use web3::{api::Namespace, contract::ens::Ens, transports::Http};

use super::Config;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Provider URL is not valid")]
	InvalidProviderUrl(#[source] anyhow::Error),
	#[error("Unable to call ENS resolver")]
	Contract(#[source] anyhow::Error),
	#[error("Provided ENS name is not registered")]
	NotRegistered,
}

type Result<T> = std::result::Result<T, Error>;

pub struct Client(Ens<Http>);

impl Client {
	pub fn new(config: &Config) -> Result<Self> {
		let transport =
			Http::new(&config.url).map_err(|e| Error::InvalidProviderUrl(anyhow!(e)))?;
		Ok(Self(Ens::new(transport)))
	}

	pub async fn eth_address(&self, name: &str) -> Result<EthereumAddress> {
		match self.0.eth_address(name).await {
			Ok(address) if address.is_zero() => Err(Error::NotRegistered),
			Ok(address) => Ok(address.into()),
			Err(error) => Err(Error::Contract(anyhow!(error))),
		}
	}
}
