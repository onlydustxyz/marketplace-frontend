use diesel_derive_enum::DbEnum;
use domain::blockchain;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Hash, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::Network"]
pub enum Network {
	Ethereum,
	Optimism,
	Aptos,
	Starknet,
}

impl From<blockchain::Network> for Network {
	fn from(network: blockchain::Network) -> Self {
		match network {
			blockchain::Network::Ethereum => Network::Ethereum,
			blockchain::Network::Optimism => Network::Optimism,
			blockchain::Network::Aptos => Network::Aptos,
			blockchain::Network::Starknet => Network::Starknet,
		}
	}
}
