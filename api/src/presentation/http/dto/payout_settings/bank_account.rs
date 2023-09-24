use domain::{Iban, UserId};
use serde::{Deserialize, Serialize};

use crate::models;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct BankAccount {
	#[serde(rename = "BIC")]
	bic: String,
	#[serde(rename = "IBAN")]
	iban: Iban,
}

impl From<(UserId, BankAccount)> for models::BankAccount {
	fn from((user_id, account): (UserId, BankAccount)) -> Self {
		Self {
			user_id,
			bic: account.bic,
			iban: account.iban.to_string(),
		}
	}
}
