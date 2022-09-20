use serde::{Deserialize, Serialize};
use std::fmt::Display;

use crate::{ContributorAccount, GithubUserId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	GithubAccountAssociated {
		contributor_account: ContributorAccount,
		github_identifier: GithubUserId,
	},
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}
