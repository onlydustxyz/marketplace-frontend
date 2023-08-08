use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubCodeReviewStatus"]
pub enum GithubCodeReviewStatus {
	Pending,
	Completed,
}

impl From<domain::GithubCodeReviewStatus> for GithubCodeReviewStatus {
	fn from(status: domain::GithubCodeReviewStatus) -> Self {
		match status {
			domain::GithubCodeReviewStatus::Pending => Self::Pending,
			domain::GithubCodeReviewStatus::Completed => Self::Completed,
		}
	}
}
