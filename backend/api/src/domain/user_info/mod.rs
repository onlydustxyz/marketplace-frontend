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
pub use payout_settings::{BankAddress, EthereumAddress, PayoutSettings};

mod location;
pub use location::Location;

#[derive(
	Debug,
	Clone,
	Constructor,
	Getters,
	Dissolve,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
)]
#[table_name = "user_info"]
pub struct UserInfo {
	#[diesel(deserialize_as = "uuid::Uuid")]
	user_id: UserId,
	identity: Identity,
	location: Location,
	email: Email,
	payout_settings: PayoutSettings,
}

impl Entity for UserInfo {
	type Id = UserId;
}
