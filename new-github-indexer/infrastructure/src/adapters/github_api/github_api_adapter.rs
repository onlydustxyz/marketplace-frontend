use std::fmt::Debug;

use async_trait::async_trait;
use chrono::{DateTime, Utc};
use domain::{
	models::{
		commits::Commit,
		issues::Issue,
		pulls::{PullRequest, Review},
		CiChecks, Languages, Repository, User,
	},
	ports::output::github_api::*,
};
use octocrab_indexer::{FromResponse, Octocrab};

use crate::adapters::github_api::error::GithubApiAdapterError;

pub struct GithubApiAdapter {
	octocrab: Octocrab,
}

impl GithubApiAdapter {
	pub async fn get_as<U, R>(&self, route: U) -> Result<R>
	where
		U: AsRef<str> + Debug + Send,
		R: FromResponse,
	{
		let response = self
			.octocrab
			.get(route, None::<&()>)
			.await
			.map_err(GithubApiAdapterError::from)?;
		Ok(response)
	}
}

#[async_trait]
impl issue::Port for GithubApiAdapter {
	#[allow(clippy::all)]
	async fn issue_by_repo_id(&self, _repo_id: u64, _issue_number: u64) -> Result<Issue> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn issues_by_repo_id(
		&self,
		_repo_id: u64,
		_updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<Issue>> {
		todo!()
	}
}

#[async_trait]
impl pull_request::Port for GithubApiAdapter {
	#[allow(clippy::all)]
	async fn pull_request_by_repo_id(
		&self,
		_repo_id: u64,
		_pull_request_number: u64,
	) -> Result<PullRequest> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_requests_by_repo_id(
		&self,
		_repo_id: u64,
		_updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<PullRequest>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_commits(&self, _pull_request: PullRequest) -> Result<Vec<Commit>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_reviews(&self, _pull_request: PullRequest) -> Result<Vec<Review>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_closing_issue_ids(&self, _pull_request: PullRequest) -> Result<Vec<u64>> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn pull_request_ci_checks(&self, _pull_request: PullRequest) -> Result<Option<CiChecks>> {
		todo!()
	}
}

#[async_trait]
impl repo::Port for GithubApiAdapter {
	async fn repo_by_id(&self, repo_id: u64) -> Result<Repository> {
		let repo: octocrab_indexer::models::Repository =
			self.get_as(format!("/repositories/{repo_id}")).await?;
		let languages: Languages =
			self.get_as(format!("/repositories/{repo_id}/languages")).await?;
		Ok(Repository { repo, languages })
	}
}

#[async_trait]
impl user::Port for GithubApiAdapter {
	#[allow(clippy::all)]
	async fn user_by_id(&self, _user_id: u64) -> Result<User> {
		todo!()
	}
}
