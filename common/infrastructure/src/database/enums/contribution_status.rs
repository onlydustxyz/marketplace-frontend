use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

use crate::database::enums::GithubPullRequestStatus;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Hash, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::ContributionStatus"]
pub enum ContributionStatus {
	InProgress,
	Complete,
	Canceled,
}

impl From<GithubPullRequestStatus> for ContributionStatus {
	fn from(status: GithubPullRequestStatus) -> Self {
		match status {
			GithubPullRequestStatus::Open => ContributionStatus::InProgress,
			GithubPullRequestStatus::Closed => ContributionStatus::Canceled,
			GithubPullRequestStatus::Merged => ContributionStatus::Complete,
		}
	}
}
