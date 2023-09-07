use derive_more::From;
use domain::blockchain::ethereum;
use serde::{Deserialize, Serialize};

use crate::models;

mod bank_address;
pub use bank_address::BankAddress;

#[derive(Debug, Clone, Serialize, Deserialize, From)]
#[serde(rename_all = "camelCase")]
pub struct PayoutSettings {
	r#type: Type,
	bank_address: Option<BankAddress>,
	eth_address: Option<ethereum::Address>,
	eth_name: Option<ethereum::Name>,
}

impl TryFrom<PayoutSettings> for models::PayoutSettings {
	type Error = anyhow::Error;

	fn try_from(input: PayoutSettings) -> Result<Self, Self::Error> {
		let typ = input.r#type;
		match typ {
			Type::EthereumAddress => input
				.eth_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_ADDRESS` without the matching `optEthAddress` field being provided"
					)
				})
				.map(|address| Self::EthTransfer(ethereum::Identity::Address(address))),
			Type::BankAddress => input
				.bank_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `BANK_ADDRESS` without the matching `optBankAddress` field being provided"
					)
				})
				.map(|bank_address| Self::WireTransfer(bank_address.into())),
			Type::EthereumName => input
				.eth_name
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_NAME` without the matching `optEthName` field being provided"
					)
				})
				.map(|name| Self::EthTransfer(ethereum::Identity::Name(name))),
		}
	}
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Type {
	EthereumAddress,
	EthereumName,
	BankAddress,
}
