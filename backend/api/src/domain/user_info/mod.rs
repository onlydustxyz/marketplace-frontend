use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::{Entity, UserId};
use serde::{Deserialize, Serialize};

mod email;
pub use email::Email;

mod identity;
pub use identity::{CompanyIdentity, Identity, PersonIdentity};

mod payout_settings;
pub use payout_settings::{BankAddress, PayoutSettings};

mod location;
pub use location::Location;

#[derive(
	Debug,
	Clone,
	Constructor,
	Getters,
	Dissolve,
	Insertable,
	Identifiable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
)]
#[table_name = "user_info"]
#[primary_key(user_id)]
#[changeset_options(treat_none_as_null = "true")]
pub struct UserInfo {
	#[diesel(deserialize_as = "uuid::Uuid")]
	user_id: UserId,
	identity: Option<Identity>,
	location: Option<Location>,
	email: Option<Email>,
	payout_settings: Option<PayoutSettings>,
}

impl Entity for UserInfo {
	type Id = UserId;
}
