mod repository;

use chrono::NaiveDateTime;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use diesel::Queryable;
use domain::UserId;
use infrastructure::database::schema::terms_and_conditions_acceptances;
use serde::{Deserialize, Serialize};

pub use self::repository::Repository;

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
	Queryable,
)]
#[diesel(primary_key(user_id))]
pub struct TermsAndConditionsAcceptance {
	user_id: UserId,
	acceptance_date: NaiveDateTime,
}

impl domain::Entity for TermsAndConditionsAcceptance {
	type Id = UserId;
}
