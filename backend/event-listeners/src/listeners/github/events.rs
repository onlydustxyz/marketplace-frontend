use domain::{
	GithubFullPullRequest, GithubFullUser, GithubIssue, GithubPullRequest, GithubRepo,
	GithubRepoId, GithubUser, MessagePayload,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum Event {
	Repo(GithubRepo),
	Issue(GithubIssue),
	PullRequest(GithubPullRequest),
	FullPullRequest(GithubFullPullRequest),
	User {
		user: GithubUser,
		repo_id: GithubRepoId,
	},
	FullUser(GithubFullUser),
}

impl MessagePayload for Event {}
