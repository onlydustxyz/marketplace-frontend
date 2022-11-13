use chrono::NaiveDateTime;
use uuid::Uuid;

use crate::database::schema::pending_applications;

#[derive(Insertable, Queryable, AsChangeset, Debug, Identifiable)]
#[primary_key(contribution_id, contributor_id)]
pub struct PendingApplication {
	pub contribution_id: String,
	pub applied_at: NaiveDateTime,
	pub contributor_id: Uuid,
}
