use chrono::NaiveDateTime;
use diesel::{Identifiable, Queryable};
use domain::UserId;
use infrastructure::database::schema::terms_and_conditions_acceptances;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Identifiable, Serialize, Deserialize, AsChangeset, Queryable, Model,
)]
#[diesel(primary_key(user_id))]
pub struct TermsAndConditionsAcceptance {
	pub user_id: UserId,
	pub acceptance_date: NaiveDateTime,
}

impl Identifiable for TermsAndConditionsAcceptance {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
