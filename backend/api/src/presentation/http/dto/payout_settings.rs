/// This module defines a payout settings input struct.
/// 
/// `PayoutSettingsInput` is used as an input for a GraphQL mutation that allows the user to update their payout settings.
/// 
/// `PayoutSettingsType` is an enum that specifies which type of payout setting is being updated and is used as a field for the `PayoutSettingsInput`. 
/// 
/// The `PayoutSettingsInput` struct contains an optional `EthereumAddress`, `BankAddress`, or `EthereumName` attribute, depending on which `PayoutSettingsType` is selected.
/// 
/// `PayoutSettings` is a domain struct representing the payout settings for a user. It can either hold an `EthereumIdentity` or a `BankAddress`, depending on the payout settings type.
use derive_more::From;
use domain::{EthereumAddress, EthereumIdentity, EthereumName};
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{BankAddress, PayoutSettings};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct PayoutSettingsInput {
	r#type: PayoutSettingsType,
	opt_eth_address: Option<EthereumAddress>,
	opt_bank_address: Option<BankAddress>,
	opt_eth_name: Option<EthereumName>,
}

impl TryFrom<PayoutSettingsInput> for PayoutSettings {
	type Error = anyhow::Error;
	
	/// Try to create a `PayoutSettings` object from a `PayoutSettingsInput` object.
	/// 
	/// # Arguments
	/// 
	/// * `input` - A `PayoutSettingsInput` object.
	/// 
	/// # Errors
	/// 
	/// This function returns an error if the wrong `PayoutSettingsType` is selected and the corresponding field is not provided.
	/// 
	/// # Returns
	/// 
	/// A `PayoutSettings` object.
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
				.map(|address| PayoutSettings::EthTransfer(EthereumIdentity::Address(address))),
			PayoutSettingsType::BankAddress => input
				.opt_bank_address
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `BANK_ADDRESS` without the matching `optBankAddress` field being provided"
					)
				})
				.map(PayoutSettings::WireTransfer),
			PayoutSettingsType::EthereumName => input
				.opt_eth_name
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `ETHEREUM_NAME` without the matching `optEthName` field being provided"
					)
				})
				.map(|name| PayoutSettings::EthTransfer(EthereumIdentity::Name(name))),
		}
	}
}

/// An enum representing the type of payout setting being updated.
#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum PayoutSettingsType {
	EthereumAddress,
	EthereumName,
	BankAddress,
}