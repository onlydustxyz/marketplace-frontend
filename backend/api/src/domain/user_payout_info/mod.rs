use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use diesel::{pg::Pg, Queryable};
use domain::UserId;
use serde::{Deserialize, Serialize};

mod email;

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
	AsChangeset,
)]
#[table_name = "user_payout_info"]
#[primary_key(user_id)]
#[changeset_options(treat_none_as_null = "true")]
pub struct UserPayoutInfo {
	#[diesel(deserialize_as = "uuid::Uuid")]
	user_id: UserId,
	identity: Option<Identity>,
	location: Option<Location>,
	payout_settings: Option<PayoutSettings>,
}

impl domain::Entity for UserPayoutInfo {
	type Id = UserId;
}

impl<ST> Queryable<ST, Pg> for UserPayoutInfo
where
	(
		UserId,
		Option<Identity>,
		Option<Location>,
		Option<PayoutSettings>,
		bool,
	): Queryable<ST, Pg>,
{
	type Row = <(
		UserId,
		Option<Identity>,
		Option<Location>,
		Option<PayoutSettings>,
		bool,
	) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> Self {
		let (user_id, identity, location, payout_settings, _) = Queryable::build(row);
		Self {
			user_id,
			identity,
			location,
			payout_settings,
		}
	}
}
