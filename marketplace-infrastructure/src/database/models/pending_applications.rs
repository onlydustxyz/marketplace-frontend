use chrono::NaiveDateTime;

use crate::database::schema::pending_applications;

#[derive(Insertable, Queryable, AsChangeset, Debug, Identifiable)]
#[primary_key(contribution_id, contributor_account_address)]
pub struct PendingApplication {
	pub contribution_id: String,
	pub applied_at: NaiveDateTime,
	pub contributor_account_address: String,
}
