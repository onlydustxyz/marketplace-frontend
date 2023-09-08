use diesel::Identifiable;
use domain::{
	blockchain::{aptos, ethereum},
	UserId,
};
use infrastructure::database::{
	enums::{Network, WalletType},
	schema::wallets,
};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Insertable,
	Queryable,
	Serialize,
	Deserialize,
	AsChangeset,
	Identifiable,
	PartialEq,
	Eq,
	Model,
)]
#[diesel(primary_key(user_id, network))]
pub struct Wallet {
	pub user_id: UserId,
	pub network: Network,
	pub type_: WalletType,
	pub address: String,
}

impl Identifiable for Wallet {
	type Id = (UserId, Network);

	fn id(self) -> Self::Id {
		(self.user_id, self.network)
	}
}

impl From<(UserId, ethereum::Wallet)> for Wallet {
	fn from((user_id, wallet): (UserId, ethereum::Wallet)) -> Self {
		let (type_, address) = match wallet {
			ethereum::Wallet::Name(name) => (WalletType::Name, name.to_string()),
			ethereum::Wallet::Address(address) => (WalletType::Address, address.to_string()),
		};
		Self {
			user_id,
			network: Network::Ethereum,
			type_,
			address,
		}
	}
}

impl From<(UserId, aptos::Address)> for Wallet {
	fn from((user_id, address): (UserId, aptos::Address)) -> Self {
		Self {
			user_id,
			network: Network::Aptos,
			type_: WalletType::Address,
			address: address.to_string(),
		}
	}
}
