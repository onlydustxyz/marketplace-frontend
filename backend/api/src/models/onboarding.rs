use chrono::NaiveDateTime;
use diesel::{Identifiable, Queryable};
use domain::UserId;
use infrastructure::database::schema::onboardings;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Identifiable, Serialize, Deserialize, AsChangeset, Queryable, Model,
)]
#[diesel(primary_key(user_id))]
pub struct Onboarding {
	pub user_id: UserId,
	pub terms_and_conditions_acceptance_date: Option<NaiveDateTime>,
	pub profile_wizard_display_date: Option<NaiveDateTime>,
}

impl Identifiable for Onboarding {
	type Id = UserId;

	fn id(self) -> Self::Id {
		self.user_id
	}
}
