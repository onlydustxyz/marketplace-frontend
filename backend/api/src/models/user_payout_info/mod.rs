mod email;
mod identity;
mod location;
mod payout_settings;

use diesel::{expression::AsExpression, pg::Pg, Identifiable, Queryable};
use domain::UserId;
use infrastructure::database::schema::user_payout_info;
use serde::{Deserialize, Serialize};

pub use self::{
	identity::{CompanyIdentity, Identity, PersonIdentity},
	location::Location,
	payout_settings::{BankAddress, PayoutSettings},
};

#[derive(
	Debug, Clone, Insertable, Identifiable, Serialize, Deserialize, AsExpression, AsChangeset, Model,
)]
#[diesel(table_name = user_payout_info, primary_key(user_id), treat_none_as_null = true, sql_type = diesel::sql_types::Jsonb)]
pub struct UserPayoutInfo {
	pub user_id: UserId,
	pub identity: Option<Identity>,
	pub location: Option<Location>,
	pub payout_settings: Option<PayoutSettings>,
}

impl Identifiable for UserPayoutInfo {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
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
