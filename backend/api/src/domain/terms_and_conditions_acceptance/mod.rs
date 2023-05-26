use ::infrastructure::database::schema::terms_and_conditions_acceptances;
use chrono::NaiveDateTime;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use diesel::{pg::Pg, Queryable};
use domain::UserId;
use serde::{Deserialize, Serialize};

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
#[table_name = "terms_and_conditions_acceptances"]
#[primary_key(user_id)]
pub struct TermsAndConditionsAcceptance {
	#[diesel(deserialize_as = "uuid::Uuid")]
	user_id: UserId,
	acceptance_date: NaiveDateTime,
}

impl domain::Entity for TermsAndConditionsAcceptance {
	type Id = UserId;
}

impl<ST> Queryable<ST, Pg> for TermsAndConditionsAcceptance
where
	(UserId, NaiveDateTime): Queryable<ST, Pg>,
{
	type Row = <(UserId, NaiveDateTime) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> Self {
		let (user_id, acceptance_date) = Queryable::build(row);
		Self {
			user_id,
			acceptance_date,
		}
	}
}
