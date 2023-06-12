use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubIssueType"]
pub enum Type {
	Issue,
	PullRequest,
}

impl From<domain::GithubIssueType> for Type {
	fn from(r#type: domain::GithubIssueType) -> Self {
		match r#type {
			domain::GithubIssueType::PullRequest => Self::PullRequest,
			domain::GithubIssueType::Issue => Self::Issue,
		}
	}
}
