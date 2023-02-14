use derive_more::{Display, From, Into};
use iban::Iban;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{BlockchainNetwork, EthereumAddress, TransactionHash};

#[derive(
	Debug,
	Default,
	Copy,
	Clone,
	PartialEq,
	Eq,
	Hash,
	Serialize,
	Deserialize,
	Display,
	From,
	Into,
	AsExpression,
	FromToSql,
	FromSqlRow,
)]
#[sql_type = "diesel::sql_types::Uuid"]
pub struct Id(Uuid);

impl Id {
	pub fn new() -> Self {
		Self(Uuid::new_v4())
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	OnChainPayment {
		network: BlockchainNetwork,
		recipient_address: EthereumAddress,
		transaction_hash: TransactionHash,
	},
	FiatPayment {
		recipient_iban: Iban,
		transaction_reference: String,
	},
}
