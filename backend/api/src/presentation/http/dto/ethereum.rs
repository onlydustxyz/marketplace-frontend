use derive_more::From;
use domain::blockchain::ethereum::*;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, From, GraphQLInputObject)]
pub struct EthereumIdentityInput {
	r#type: EthereumIdentityType,
	opt_eth_address: Option<Address>,
	opt_eth_name: Option<Name>,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum EthereumIdentityType {
	EthereumAddress,
	EthereumName,
}

impl TryFrom<EthereumIdentityInput> for Wallet {
	type Error = anyhow::Error;

	fn try_from(value: EthereumIdentityInput) -> Result<Self, Self::Error> {
		match value.r#type {
			EthereumIdentityType::EthereumAddress => value
				.opt_eth_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_ADDRESS` without the matching `optEthAddress` field being provided"
					)
				})
				.map(Wallet::Address),
			EthereumIdentityType::EthereumName => value
				.opt_eth_name
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_NAME` without the matching `optEthName` field being provided"
					)
				})
				.map(Wallet::Name),
		}
	}
}
