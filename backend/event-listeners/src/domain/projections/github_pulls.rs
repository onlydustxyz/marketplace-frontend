use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use derive_more::Constructor;
use domain::{GithubIssueId, GithubIssueNumber, GithubRepoId, GithubUserId};
use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Constructor)]
pub struct GithubPull {
	id: GithubIssueId,
	repo_id: GithubRepoId,
	issue_number: GithubIssueNumber,
	created_at: NaiveDateTime,
	author_id: GithubUserId,
	merged_at: Option<NaiveDateTime>,
}

impl domain::Entity for GithubPull {
	type Id = GithubIssueId;
}
