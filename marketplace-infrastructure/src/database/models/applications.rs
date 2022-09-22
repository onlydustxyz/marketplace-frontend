use chrono::NaiveDateTime;

use crate::database::schema::*;
use uuid::Uuid;

#[derive(Insertable, Identifiable, Queryable, AsChangeset, Debug)]
#[table_name = "pending_applications"]
pub struct Application {
	pub id: Uuid,
	pub contribution_id: String,
	pub contributor_id: String,
	pub applied_at: NaiveDateTime,
}
