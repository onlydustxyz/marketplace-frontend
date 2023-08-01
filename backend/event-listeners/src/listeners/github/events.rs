use domain::{
	GithubFullUser, GithubIssue, GithubPullRequest, GithubRepo, GithubRepoId, GithubUser,
	MessagePayload,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum Event {
	Repo(GithubRepo),
	Issue(GithubIssue),
	PullRequest(GithubPullRequest),
	User {
		user: GithubUser,
		repo_id: GithubRepoId,
	},
	FullUser(GithubFullUser),
}

impl MessagePayload for Event {}
