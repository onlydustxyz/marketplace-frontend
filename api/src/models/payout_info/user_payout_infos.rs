use diesel::{expression::AsExpression, Identifiable, Queryable};
use diesel_json::Json;
use domain::UserId;
use infrastructure::database::{enums::PreferredMethod, schema::user_payout_info};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Insertable,
	Identifiable,
	Serialize,
	Deserialize,
	AsExpression,
	AsChangeset,
	Queryable,
	Model,
)]
#[diesel(table_name = user_payout_info, primary_key(user_id), treat_none_as_null = true, sql_type = diesel::sql_types::Jsonb)]
pub struct UserPayoutInfo {
	pub user_id: UserId,
	pub identity: Option<Json<Identity>>,
	pub location: Option<Json<Location>>,
	pub usd_preferred_method: Option<PreferredMethod>,
}

impl Identifiable for UserPayoutInfo {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Location {
	pub address: Option<String>,
	pub post_code: Option<String>,
	pub city: Option<String>,
	pub country: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum Identity {
	Company(CompanyIdentity),
	Person(PersonIdentity),
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct CompanyIdentity {
	pub owner: Option<PersonIdentity>,
	pub name: Option<String>,
	pub identification_number: Option<String>,
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]

pub struct PersonIdentity {
	pub firstname: Option<String>,
	pub lastname: Option<String>,
}
