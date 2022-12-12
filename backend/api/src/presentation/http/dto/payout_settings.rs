use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{BankAddress, EthereumAddress, PayoutSettings};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct PayoutSettingsInput {
	r#type: PayoutSettingsType,
	opt_eth_address: Option<EthereumAddress>,
	opt_bank_address: Option<BankAddress>,
}

impl TryFrom<PayoutSettingsInput> for PayoutSettings {
	type Error = anyhow::Error;

	fn try_from(input: PayoutSettingsInput) -> Result<Self, Self::Error> {
		let typ = input.r#type;
		match typ {
			PayoutSettingsType::EthereumAddress => input
				.opt_eth_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_ADDRESS` without the matching `optEthAddress` field being provided"
					)
				})
				.map(PayoutSettings::EthTransfer),
			PayoutSettingsType::BankAddress => input
				.opt_bank_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `BANK_ADDRESS` without the matching `optBankAddress` field being provided"
					)
				})
				.map(PayoutSettings::WireTransfer),
		}
	}
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum PayoutSettingsType {
	EthereumAddress,
	BankAddress,
}
