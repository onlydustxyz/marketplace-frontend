use crate::models;

#[derive(Debug, Clone, PartialEq)]
pub struct Repository {
	pub inner: models::Repository,
	pub languages: models::Languages,
	pub issues: Vec<Issue>,
	pub pull_requests: Vec<PullRequest>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Issue {
	pub inner: models::issues::Issue,
	pub assignees: Vec<User>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct PullRequest {
	pub inner: models::pulls::PullRequest,
	pub commits: Vec<Commit>,
	pub reviews: Vec<Review>,
	pub closing_issue_ids: Vec<models::IssueId>,
	pub check_runs: models::CheckRuns,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct User {
	pub inner: models::User,
	pub social_accounts: Vec<models::SocialAccount>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Commit {
	pub inner: models::repos::RepoCommit,
	pub author: User,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Review {
	pub inner: models::pulls::Review,
	pub author: User,
}
