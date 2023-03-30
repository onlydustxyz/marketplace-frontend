use domain::GithubRepositoryId;
use thiserror::Error;

use super::Issue;
use crate::domain::{GithubRepository, GithubUser};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not found")]
	NotFound(#[source] anyhow::Error),
	#[error("Field '{0}' is not present")]
	MissingField(String),
	#[error("Internal error")]
	Other(#[source] anyhow::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

#[allow(non_snake_case)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository>;
	async fn fetch_user_by_name(&self, username: &str) -> Result<GithubUser>;
	async fn fetch_repository_PRs(&self, repository_id: &GithubRepositoryId) -> Result<Vec<Issue>>;
	async fn fetch_issue(&self, repo_owner: &str, repo_name: &str, pr_number: u64)
	-> Result<Issue>;
	async fn fetch_issue_by_repository_id(
		&self,
		repository_id: &GithubRepositoryId,
		pr_number: u64,
	) -> Result<Issue>;
	async fn fetch_user_by_id(&self, id: u64) -> Result<GithubUser>;

	async fn search_users(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<GithubUser>>;

	async fn search_issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<Issue>>;

	async fn build_issue(
		&self,
		issue: octocrab::models::issues::Issue,
		repo_id: Option<GithubRepositoryId>,
	) -> Result<Issue>;
}
