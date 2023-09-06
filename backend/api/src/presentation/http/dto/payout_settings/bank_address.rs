use domain::Iban;
use serde::{Deserialize, Serialize};

use crate::models;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct BankAddress {
	#[serde(rename = "BIC")]
	bic: String,
	#[serde(rename = "IBAN")]
	iban: Iban,
}

impl From<BankAddress> for models::BankAddress {
	fn from(address: BankAddress) -> Self {
		Self {
			BIC: address.bic,
			IBAN: address.iban,
		}
	}
}
