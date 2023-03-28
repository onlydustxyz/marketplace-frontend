use domain::{GithubIssue, GithubRepositoryId};
use infrastructure::github::{self, FromOctocrabIssue};
use olog::{error, tracing::instrument};

use super::Contributors;
use crate::domain::{
	GithubRepository, GithubService, GithubServiceError, GithubServiceResult, GithubUser,
};

impl From<github::Error> for GithubServiceError {
	fn from(error: github::Error) -> Self {
		match error {
			github::Error::NotFound(error) => GithubServiceError::NotFound(error),
			github::Error::Other(error) => GithubServiceError::Other(error),
		}
	}
}

#[async_trait]
impl<P: github::OctocrabProxy> GithubService for P {
	#[instrument(skip(self))]
	async fn fetch_repository_by_id(&self, id: u64) -> GithubServiceResult<GithubRepository> {
		let repo = self.get_repository_by_id(id).await?;

		let contributors: Contributors = match self
			.fix_github_host(&repo.contributors_url)
			.map_err(GithubServiceError::Other)?
		{
			Some(url) => self.get_as(url).await?,
			None => Default::default(),
		};

		let owner = repo
			.owner
			.ok_or_else(|| GithubServiceError::MissingField("owner".to_string()))?;

		let html_url = repo
			.html_url
			.ok_or_else(|| GithubServiceError::MissingField("html_url".to_string()))?;

		Ok(GithubRepository::new(
			id as i32,
			contributors.into_iter().map(Into::into).collect(),
			owner.avatar_url,
			html_url,
			repo.description.unwrap_or_default(),
			repo.stargazers_count.unwrap_or_default() as i32,
			repo.forks_count.unwrap_or_default() as i32,
		))
	}

	#[instrument(skip(self))]
	async fn fetch_user_by_name(&self, username: &str) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_name(username).await?;
		Ok(user.into())
	}

	#[instrument(skip(self))]
	async fn fetch_repository_PRs(
		&self,
		repository_id: &GithubRepositoryId,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let repository_id: u64 = i64::from(*repository_id)
			.try_into()
			.expect("Repository id should always be positive");

		let octocrab_pull_requests = self.get_repository_PRs(repository_id).await?;
		let pull_requests = octocrab_pull_requests
			.into_iter()
			.filter_map(
				|pr| match GithubIssue::from_octocrab_pull_request(pr.clone()) {
					Ok(pr) => Some(pr),
					Err(e) => {
						error!(
							error = e.to_string(),
							repository_id = repository_id,
							pullrequest_id = pr.id.0,
							"Failed to process pull request"
						);
						None
					},
				},
			)
			.collect();

		Ok(pull_requests)
	}

	#[instrument(skip(self))]
	async fn fetch_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: u64,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self.get_issue(repo_owner, repo_name, issue_number).await?;
		GithubIssue::from_octocrab_issue(issue)
			.map_err(|e| GithubServiceError::MissingField(e.to_string()))
	}

	#[instrument(skip(self))]
	async fn fetch_user_by_id(&self, id: u64) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_id(id).await?;
		Ok(user.into())
	}

	#[instrument(skip(self))]
	async fn search_users(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubUser>> {
		let users = self
			.search_users(query, sort, order, per_page, page)
			.await?
			.into_iter()
			.map(GithubUser::from)
			.collect();
		Ok(users)
	}

	#[instrument(skip(self))]
	async fn search_issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let issues = self
			.search_issues(query, sort, order, per_page, page)
			.await?
			.into_iter()
			.filter_map(|issue| match GithubIssue::from_octocrab_issue(issue) {
				Ok(issue) => Some(issue),
				Err(error) => {
					error!(error = error.to_string(), "Failed to map Octocrab issue");
					None
				},
			})
			.collect();
		Ok(issues)
	}
}

impl From<octocrab::models::User> for GithubUser {
	fn from(user: octocrab::models::User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url, user.html_url)
	}
}
