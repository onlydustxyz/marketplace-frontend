use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubIssueStatus"]
pub enum GithubIssueStatus {
	Open,
	Completed,
	Cancelled,
}

impl From<domain::GithubIssueStatus> for GithubIssueStatus {
	fn from(status: domain::GithubIssueStatus) -> Self {
		match status {
			domain::GithubIssueStatus::Open => Self::Open,
			domain::GithubIssueStatus::Completed => Self::Completed,
			domain::GithubIssueStatus::Cancelled => Self::Cancelled,
		}
	}
}
