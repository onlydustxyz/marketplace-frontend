/// This module provides a client for Ethereum Name Service (ENS) resolution on an Ethereum chain.
use anyhow::anyhow;
use domain::EthereumAddress;
use thiserror::Error;
use web3::{
    api::Namespace,
    contract::ens::Ens,
    transports::Http,
};

use super::Config;

#[derive(Debug, Error)]
/// Errors that may occur when working with ENS resolution.
pub enum Error {
    #[error("Provider URL is not valid")]
    /// Error indicating that the provided provider URL is not valid.
    InvalidProviderUrl(#[source] anyhow::Error),
    #[error("Unable to call ENS resolver")]
    /// Error indicating that calling the ENS resolver failed.
    Contract(#[source] anyhow::Error),
    #[error("Provided ENS name is not registered")]
    /// Error indicating that the provided ENS name is not registered.
    NotRegistered,
}

type Result<T> = std::result::Result<T, Error>;

pub struct Client(Ens<Http>);

impl Client {
	/// Creates a new instance of the ENS client.
    pub fn new(config: &Config) -> Result<Self> {
        let transport =
            Http::new(&config.url).map_err(|e| Error::InvalidProviderUrl(anyhow!(e)))?;
        Ok(Self(Ens::new(transport)))
    }

	/// Resolves an ENS name to an Ethereum address.
	///
	/// # Arguments
	///
	/// * `name` - The ENS name to resolve.
    pub async fn eth_address(&self, name: &str) -> Result<EthereumAddress> {
        match self.0.eth_address(name).await {
            Ok(address) if address.is_zero() => Err(Error::NotRegistered),
            Ok(address) => Ok(address.into()),
            Err(error) => Err(Error::Contract(anyhow!(error))),
        }
    }
}