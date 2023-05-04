use domain::{GithubIssue, GithubRepo, GithubUser, GithubUserId, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Event {
	Repo(GithubRepo),
	PullRequest(GithubIssue),
	Issue(GithubIssue),
	User(GithubUser),
	NewContributor(GithubUserId),
}

impl MessagePayload for Event {}
