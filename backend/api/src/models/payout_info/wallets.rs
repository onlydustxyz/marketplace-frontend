use diesel::Identifiable;
use domain::UserId;
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
