use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Hash, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::Network"]
pub enum Network {
	Ethereum,
	Aptos,
}
