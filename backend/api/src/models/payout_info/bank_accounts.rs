use diesel::Identifiable;
use domain::UserId;
use infrastructure::database::schema::bank_accounts;
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Default,
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
#[diesel(primary_key(user_id))]
pub struct BankAccount {
	pub user_id: UserId,
	pub bic: String,
	pub iban: String,
}

impl Identifiable for BankAccount {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
