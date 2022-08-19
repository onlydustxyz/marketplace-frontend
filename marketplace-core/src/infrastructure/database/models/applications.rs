use std::io::Write;

use marketplace_domain::ApplicationStatus;

use crate::infrastructure::database::schema::*;
use diesel::{
	pg::Pg,
	serialize::Output,
	sql_types::Text,
	types::{FromSql, IsNull, ToSql},
};
use uuid::Uuid;

#[derive(Insertable, Identifiable, Queryable, AsChangeset, Debug)]
#[table_name = "applications"]
pub struct Application {
	pub id: Uuid,
	pub contribution_id: Uuid,
	pub contributor_id: String,
	pub status: Status,
}

#[derive(Debug, Copy, Clone, AsExpression, FromSqlRow)]
#[sql_type = "Text"]
pub enum Status {
	Pending,
	Accepted,
	Refused,
}

impl ToSql<Text, Pg> for Status {
	fn to_sql<W: Write>(&self, out: &mut Output<W, Pg>) -> diesel::serialize::Result {
		match *self {
			Status::Pending => out.write_all(b"pending")?,
			Status::Accepted => out.write_all(b"accepted")?,
			Status::Refused => out.write_all(b"refused")?,
		}
		Ok(IsNull::No)
	}
}
impl FromSql<Text, Pg> for Status {
	fn from_sql(bytes: Option<&[u8]>) -> diesel::deserialize::Result<Self> {
		match not_none!(bytes) {
			b"pending" => Ok(Status::Pending),
			b"accepted" => Ok(Status::Accepted),
			b"refused" => Ok(Status::Refused),
			_ => Err("Unrecognized enum variant".into()),
		}
	}
}

impl From<ApplicationStatus> for Status {
	fn from(status: ApplicationStatus) -> Self {
		match status {
			ApplicationStatus::Pending => Status::Pending,
			ApplicationStatus::Accepted => Status::Accepted,
			ApplicationStatus::Refused => Status::Refused,
		}
	}
}

impl From<Status> for ApplicationStatus {
	fn from(status: Status) -> Self {
		match status {
			Status::Pending => ApplicationStatus::Pending,
			Status::Accepted => ApplicationStatus::Accepted,
			Status::Refused => ApplicationStatus::Refused,
		}
	}
}
