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
}

impl domain::Entity for GithubPull {
	type Id = GithubIssueId;
}

#[derive(Default, Debug, Clone, AsChangeset, Serialize, Deserialize, Constructor)]
#[table_name = "github_pulls"]
pub struct GithubMergedPull {
	merged_at: Option<NaiveDateTime>,
}
