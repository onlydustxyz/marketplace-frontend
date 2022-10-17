use crate::{ContributorAccountAddress, ContributorDiscordHandle, GithubUserId};
use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	GithubAccountAssociated {
		contributor_account: ContributorAccountAddress,
		github_identifier: GithubUserId,
		contributor_id: ContributorAccountAddress,
	},
	DiscordHandleRegistered {
		contributor_account_address: ContributorAccountAddress,
		discord_handle: ContributorDiscordHandle,
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
