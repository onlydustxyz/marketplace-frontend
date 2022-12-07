use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct PayoutSettingsInput {
	r#type: PayoutSettingsType,
	opt_eth_address: Option<EthereumAddress>,
	opt_bank_address: Option<BankAddress>,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum PayoutSettingsType {
	EthereumAddress,
	BankAddress,
}

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum PayoutSettings {
	WireTransfer(BankAddress),
	EthTransfer(EthereumAddress),
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

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct EthereumAddress(String);

#[juniper::graphql_scalar(
	description = "A `0x` prefixed hexadecimal string representing 20 bytes of data"
)]
impl<S> GraphQLScalar for EthereumAddress
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.0.to_owned())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
		let str_value = value.as_string_value()?;
		if str_value.len() < 3 || str_value.len() > 42 || str_value[0..2].to_lowercase() != "0x" {
			None
		} else {
			let padded = format!(
				"0x{:0>width$}",
				&str_value[2..].to_lowercase(),
				width = str_value.len() - 2 + str_value.len() % 2
			); // Add 0 if len is odd
			Some(EthereumAddress(padded))
		}
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
#[allow(non_snake_case)]
pub struct BankAddress {
	BIC: String,
	IBAN: String,
}
