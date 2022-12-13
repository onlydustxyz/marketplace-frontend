use crate::{BlockchainNetwork, ContractAddress, TransactionHash};
use derive_more::{Display, From, Into};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

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

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	OnChainPayment {
		network: BlockchainNetwork,
		recipient_address: ContractAddress,
		transaction_hash: TransactionHash,
	},
}
