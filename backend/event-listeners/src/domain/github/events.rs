use domain::{GithubIssue, GithubRepo, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Event {
	Repo(GithubRepo),
	PullRequest(GithubIssue),
	Issue(GithubIssue),
}

impl MessagePayload for Event {}
