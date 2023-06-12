use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use diesel::{expression::AsExpression, pg::Pg, Queryable};
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
	AsExpression,
	AsChangeset,
)]
#[diesel(table_name = user_payout_info, primary_key(user_id), treat_none_as_null = true, sql_type = diesel::sql_types::Jsonb)]
pub struct UserPayoutInfo {
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

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (user_id, identity, location, payout_settings, _) = Queryable::build(row)?;
		Ok(Self {
			user_id,
			identity,
			location,
			payout_settings,
		})
	}
}
