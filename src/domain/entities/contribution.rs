use crate::domain::*;
use std::str::FromStr;
use url::Url;

#[derive(Debug, PartialEq, Eq, Clone)]
pub enum Status {
	Open = 0,
	Assigned = 1,
	Completed = 2,
	Abandoned = 3,
}

pub type Id = String;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Contribution {
	pub id: Id,
	pub project_id: ProjectId,
	pub contributor_id: Option<ContributorId>,
	pub title: Option<String>,
	pub description: Option<String>,
	pub status: Status,
	pub external_link: Option<Url>,
	pub gate: u8,
	pub metadata: Metadata,
}

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Metadata {
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}

impl FromStr for Status {
	type Err = Error;

	fn from_str(s: &str) -> Result<Self> {
		match s {
			"OPEN" => Ok(Status::Open),
			"ASSIGNED" => Ok(Status::Assigned),
			"COMPLETED" => Ok(Status::Completed),
			"ABANDONED" => Ok(Status::Abandoned),
			_ => Err(Error::ParseStatusError(format!(
				"Unable to parse {} into a contribution status",
				s,
			))),
		}
	}
}
