use chrono::NaiveDateTime;

use crate::database::schema::pending_applications;

#[derive(Insertable, Queryable, AsChangeset, Debug, Identifiable)]
#[table_name = "pending_applications"]
#[primary_key(contribution_id, contributor_id)]
pub struct Application {
	pub contribution_id: String,
	pub contributor_id: String,
	pub applied_at: NaiveDateTime,
}
