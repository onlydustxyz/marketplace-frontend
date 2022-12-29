mod ethereum;

use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

pub use self::ethereum::{EthereumIdentity, EthereumName};

#[derive(
	Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow, PartialEq, Eq,
)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum PayoutSettings {
	WireTransfer(BankAddress),
	EthTransfer(EthereumIdentity),
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject, PartialEq, Eq)]
#[allow(non_snake_case)]
pub struct BankAddress {
	BIC: String,
	IBAN: String,
}
