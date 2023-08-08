use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::GithubCiChecks"]
pub enum GithubCiChecks {
	Passed,
	Failed,
}

impl From<domain::GithubCiChecks> for GithubCiChecks {
	fn from(checks: domain::GithubCiChecks) -> Self {
		match checks {
			domain::GithubCiChecks::Passed => Self::Passed,
			domain::GithubCiChecks::Failed => Self::Failed,
		}
	}
}
