use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubCodeReviewOutcome"]
pub enum GithubCodeReviewOutcome {
	ChangeRequested,
	Approved,
}

impl From<domain::GithubCodeReviewOutcome> for GithubCodeReviewOutcome {
	fn from(status: domain::GithubCodeReviewOutcome) -> Self {
		match status {
			domain::GithubCodeReviewOutcome::ChangeRequested => Self::ChangeRequested,
			domain::GithubCodeReviewOutcome::Approved => Self::Approved,
		}
	}
}
