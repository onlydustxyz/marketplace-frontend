use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubIssueStatus"]
pub enum Status {
	Open,
	Closed,
	Merged,
	Completed,
	Cancelled,
}

impl From<domain::GithubIssueStatus> for Status {
	fn from(status: domain::GithubIssueStatus) -> Self {
		match status {
			domain::GithubIssueStatus::Open => Self::Open,
			domain::GithubIssueStatus::Closed => Self::Closed,
			domain::GithubIssueStatus::Merged => Self::Merged,
			domain::GithubIssueStatus::Completed => Self::Completed,
			domain::GithubIssueStatus::Cancelled => Self::Cancelled,
		}
	}
}
