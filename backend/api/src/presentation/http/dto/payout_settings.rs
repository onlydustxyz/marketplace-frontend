use derive_more::From;
use domain::EthereumAddress;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{BankAddress, EthereumName};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct PayoutSettingsInput {
	pub r#type: Option<PayoutSettingsType>,
	pub opt_eth_address: Option<EthereumAddress>,
	pub opt_bank_address: Option<BankAddress>,
	pub opt_eth_name: Option<EthereumName>,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum PayoutSettingsType {
	EthereumAddress,
	EthereumName,
	BankAddress,
}
