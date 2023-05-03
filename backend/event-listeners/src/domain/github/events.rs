use domain::{GithubIssue, GithubRepo, GithubUser, MessagePayload};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum Event {
	Repo(GithubRepo),
	PullRequest(GithubIssue),
	Issue(GithubIssue),
	User(GithubUser),
}

impl MessagePayload for Event {}
