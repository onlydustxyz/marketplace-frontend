use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubPullRequestStatus"]
pub enum GithubPullRequestStatus {
	Open,
	Closed,
	Merged,
}

impl From<domain::GithubPullRequestStatus> for GithubPullRequestStatus {
	fn from(status: domain::GithubPullRequestStatus) -> Self {
		match status {
			domain::GithubPullRequestStatus::Open => Self::Open,
			domain::GithubPullRequestStatus::Closed => Self::Closed,
			domain::GithubPullRequestStatus::Merged => Self::Merged,
		}
	}
}
