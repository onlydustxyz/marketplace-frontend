use derive_more::From;
use domain::blockchain::ethereum;
use serde::{Deserialize, Serialize};

mod bank_account;
pub use bank_account::BankAccount;

#[derive(Debug, Clone, Serialize, Deserialize, From, Default)]
#[serde(rename_all = "camelCase")]
pub struct PayoutSettings {
	pub usd_preferred_method: Option<PreferredMethod>,
	pub bank_account: Option<BankAccount>,
	pub eth_address: Option<ethereum::Address>,
	pub eth_name: Option<ethereum::Name>,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum PreferredMethod {
	Crypto,
	Fiat,
}

impl From<PreferredMethod> for infrastructure::database::enums::PreferredMethod {
	fn from(method: PreferredMethod) -> Self {
		match method {
			PreferredMethod::Crypto => Self::Crypto,
			PreferredMethod::Fiat => Self::Fiat,
		}
	}
}
