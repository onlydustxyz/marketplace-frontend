use domain::{GithubFullUser, GithubIssue, GithubRepo, GithubRepoId, GithubUser, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Event {
	Repo(GithubRepo),
	PullRequest(GithubIssue),
	Issue(GithubIssue),
	User {
		user: GithubUser,
		repo_id: Option<GithubRepoId>,
	},
	FullUser(GithubFullUser),
}

impl MessagePayload for Event {}
