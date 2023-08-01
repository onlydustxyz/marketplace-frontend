use std::{
	fmt::Debug,
	future::{self, ready},
	pin::Pin,
	sync::Arc,
};

use anyhow::anyhow;
use domain::{
	stream_filter::{self, StreamFilterWith},
	GithubFullUser, GithubIssue, GithubIssueNumber, GithubPullRequest, GithubPullRequestNumber,
	GithubRepoId, GithubServiceIssueFilters, GithubServicePullRequestFilters, GithubUser,
	GithubUserId, Languages, PositiveCount,
};
use futures::{stream::empty, Stream, StreamExt, TryStreamExt};
use octocrab::{
	models::{
		issues::{Comment, Issue},
		pulls::PullRequest,
		repos::Content,
		Repository, User,
	},
	params::{pulls::Sort, Direction},
	FromResponse, Octocrab,
};
use olog::{tracing::instrument, IntoField};
use reqwest::Url;

use super::{
	issue::FromOctocrab as FromOctocrabIssue,
	pull_request::FromOctocrab as FromOctocrabPullRequest,
	service::{query_params::State, QueryParams},
	AddHeaders, Config, Error,
};

mod round_robin;
pub use round_robin::Client as RoundRobinClient;

mod single;
use olog::error;
pub use single::Client as SingleClient;

pub enum Client {
	Single(SingleClient),
	RoundRobin(RoundRobinClient),
}

impl From<SingleClient> for Client {
	fn from(client: SingleClient) -> Self {
		Self::Single(client)
	}
}

impl From<RoundRobinClient> for Client {
	fn from(client: RoundRobinClient) -> Self {
		Self::RoundRobin(client)
	}
}

impl Client {
	pub fn octocrab(&self) -> &Octocrab {
		match self {
			Client::Single(client) => client.octocrab(),
			Client::RoundRobin(client) => client.octocrab(),
		}
	}

	pub fn config(&self) -> &Config {
		match self {
			Client::Single(client) => client.config(),
			Client::RoundRobin(client) => client.config(),
		}
	}

	pub async fn get_issue_repository_id(&self, issue: &Issue) -> Result<GithubRepoId, Error> {
		let repository_url = self.fix_github_host(&issue.repository_url).map_err(Error::Other)?;
		let repo = self.get_as::<_, Repository>(repository_url).await?;
		Ok((repo.id.0 as i64).into())
	}

	/// Search users using the Github Search API
	/// See https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users for more info.
	#[instrument(skip(self))]
	pub async fn search_users(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<User>, Error> {
		let mut request = self.octocrab().search().users(query);
		if let Some(sort) = sort {
			request = request.sort(sort);
		}
		if let Some(order) = order {
			request = request.order(order);
		}
		if let Some(per_page) = per_page {
			request = request.per_page(per_page);
		}
		if let Some(page) = page {
			request = request.page(page);
		}
		Ok(request.send().await?.items)
	}

	/// Search issues using the Github Search API
	/// See https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-issues-and-pull-requests for more info.
	#[instrument(skip(self))]
	pub async fn search_issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<Issue>, Error> {
		let mut request = self.octocrab().search().issues_and_pull_requests(query);
		if let Some(sort) = sort {
			request = request.sort(sort);
		}
		if let Some(order) = order {
			request = request.order(order);
		}
		if let Some(per_page) = per_page {
			request = request.per_page(per_page);
		}
		if let Some(page) = page {
			request = request.page(page);
		}
		Ok(request.send().await?.items)
	}

	#[instrument(skip(self))]
	pub async fn get_as<U, R>(&self, url: U) -> Result<R, Error>
	where
		U: AsRef<str> + Debug + Send,
		R: FromResponse,
	{
		let response = self.octocrab().get(url, None::<&()>).await?;
		Ok(response)
	}

	#[instrument(skip(self))]
	async fn stream_as<R: serde::de::DeserializeOwned + Send + 'static>(
		&self,
		url: Url,
		max_results: usize,
	) -> Result<Pin<Box<dyn Stream<Item = R> + Send + '_>>, Error> {
		Ok(self
			.octocrab()
			.get_page::<R>(&Some(url))
			.await?
			.map(|page| {
				page.into_stream(self.octocrab())
					.take(max_results)
					.inspect_err(|e| error!(error = e.to_field(), "Unable to stream from github"))
					.take_while(|res| ready(res.is_ok()))
					.map(Result::unwrap)
					.boxed()
			})
			.unwrap_or_else(|| empty().boxed()))
	}

	#[instrument(skip(self))]
	pub async fn get_repository_by_id(&self, id: GithubRepoId) -> Result<Repository, Error> {
		self.get_as(format!("{}repositories/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn get_languages_by_repository_id(
		&self,
		id: GithubRepoId,
	) -> Result<Languages, Error> {
		self.get_as(format!(
			"{}repositories/{id}/languages",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self, filters))]
	pub async fn get_contributors_by_repository_id(
		&self,
		id: &GithubRepoId,
		filters: Arc<dyn stream_filter::Filter<I = GithubUser>>,
	) -> Result<Vec<GithubUser>, Error> {
		let query_params = QueryParams::default().page(1).per_page(100);

		let url = format!(
			"{}repositories/{id}/contributors?{}",
			self.octocrab().base_url,
			query_params.to_query_string()?
		)
		.parse()?;

		let contributors = self
			.stream_as::<GithubUser>(
				url,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.filter_with(filters)
			.collect()
			.await;
		Ok(contributors)
	}

	#[instrument(skip(self))]
	pub async fn get_current_user(&self) -> Result<User, Error> {
		let user = self.octocrab().current().user().await?;
		Ok(user)
	}

	#[instrument(skip(self))]
	pub async fn get_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> Result<Issue, Error> {
		let issue_number: i64 = issue_number.into();
		let issue = self.octocrab().issues(repo_owner, repo_name).get(issue_number as u64).await?;
		Ok(issue)
	}

	#[instrument(skip(self))]
	pub async fn get_issue_by_repository_id(
		&self,
		repo_id: GithubRepoId,
		issue_number: GithubIssueNumber,
	) -> Result<Issue, Error> {
		let issue: Issue = self
			.get_as(format!(
				"{}repositories/{repo_id}/issues/{issue_number}",
				self.octocrab().base_url
			))
			.await?;
		match issue.pull_request {
			Some(_) => Err(Error::NotFound(anyhow!("Issue is in fact a pull request"))),
			None => Ok(issue),
		}
	}

	#[instrument(skip(self))]
	pub async fn get_pull_request_by_repository_id(
		&self,
		repo_id: GithubRepoId,
		pr_number: GithubPullRequestNumber,
	) -> Result<PullRequest, Error> {
		self.get_as(format!(
			"{}repositories/{repo_id}/pulls/{pr_number}",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	pub async fn issues_by_repo_id(
		&self,
		id: GithubRepoId,
		filters: GithubServiceIssueFilters,
	) -> Result<Vec<GithubIssue>, Error> {
		let sort = if filters.updated_since.is_some() {
			Sort::Updated
		} else {
			Sort::Created
		};

		let query_params = QueryParams::default()
			.state(State::All)
			.sort(sort)
			.direction(Direction::Descending)
			.page(1)
			.per_page(100);

		let url = format!(
			"{}repositories/{id}/issues?{}",
			self.octocrab().base_url,
			query_params.to_query_string()?
		)
		.parse()?;

		let issues = self
			.stream_as::<Issue>(
				url,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.filter_map(|issue| {
				future::ready({
					if issue.pull_request.is_some() {
						None
					} else {
						match GithubIssue::from_octocrab(issue.clone(), id) {
							Ok(issue) => Some(issue),
							Err(e) => {
								error!(
									error = e.to_field(),
									repository_id = id.to_string(),
									issue_id = issue.id.0,
									"Failed to process issue"
								);
								None
							},
						}
					}
				})
			})
			.filter_with(Arc::new(filters))
			.collect()
			.await;
		Ok(issues)
	}

	#[instrument(skip(self))]
	pub async fn pulls_by_repo_id(
		&self,
		id: GithubRepoId,
		filters: GithubServicePullRequestFilters,
	) -> Result<Vec<GithubPullRequest>, Error> {
		let sort = if filters.updated_since.is_some() {
			Sort::Updated
		} else {
			Sort::Created
		};

		let query_params = QueryParams::default()
			.state(State::All)
			.sort(sort)
			.direction(Direction::Descending)
			.page(1)
			.per_page(100);

		let url = format!(
			"{}repositories/{id}/pulls?{}",
			self.octocrab().base_url,
			query_params.to_query_string()?
		)
		.parse()?;

		let pull_requests = self
			.stream_as::<PullRequest>(
				url,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.filter_map(|pull_request| {
				future::ready({
					match GithubPullRequest::from_octocrab(pull_request.clone()) {
						Ok(pull_request) => Some(pull_request),
						Err(e) => {
							error!(
								error = e.to_field(),
								repository_id = id.to_string(),
								pull_request_id = pull_request.id.0,
								"Failed to process pull_request"
							);
							None
						},
					}
				})
			})
			.filter_with(Arc::new(filters))
			.collect()
			.await;
		Ok(pull_requests)
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_id(&self, id: &GithubUserId) -> Result<User, Error> {
		self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn get_full_user_by_id(&self, id: &GithubUserId) -> Result<GithubFullUser, Error> {
		let mut user: GithubFullUser =
			self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await?;
		user.social_accounts = self
			.get_as(format!(
				"{}user/{id}/social_accounts",
				self.octocrab().base_url
			))
			.await?;
		Ok(user)
	}

	#[instrument(skip(self))]
	pub async fn all_issue_comments(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<Vec<Comment>, Error> {
		let issue_number: i64 = (*issue_number).into();

		let first_page = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.list_comments(issue_number as u64)
			.per_page(100)
			.send()
			.await?;

		let comments = self.octocrab().all_pages(first_page).await?;

		Ok(comments)
	}

	#[instrument(skip(self))]
	pub async fn get_raw_file(&self, repo: &Repository, path: &str) -> Result<Content, Error> {
		let owner = repo
			.owner
			.as_ref()
			.ok_or_else(|| Error::Other(anyhow!("Missing owner in github repository")))?
			.login
			.clone();

		let mut contents = self
			.octocrab()
			.repos(owner, &repo.name)
			.get_content()
			.path(path)
			.r#ref("HEAD")
			.send()
			.await?;

		contents
			.items
			.pop()
			.ok_or_else(|| Error::NotFound(anyhow!("Could not find {path} in repository")))
	}

	pub fn fix_github_host(&self, url: &Url) -> anyhow::Result<Url> {
		let url = format!(
			"{}{}",
			self.octocrab().base_url.as_str().trim_end_matches('/'),
			url.path()
		)
		.parse()?;
		Ok(url)
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case(
		"http://plop.fr/github/",
		"https://api.github.com/repos/ning-rain/evens/contributors",
		"http://plop.fr/github/repos/ning-rain/evens/contributors"
	)]
	#[case(
		"http://plop.fr/github",
		"https://api.github.com/repos/ning-rain/evens/contributors",
		"http://plop.fr/github/repos/ning-rain/evens/contributors"
	)]
	#[case(
		"http://plop.fr/github/",
		"https://api.github.com",
		"http://plop.fr/github/"
	)]
	#[case(
		"http://plop.fr/github",
		"https://api.github.com",
		"http://plop.fr/github/"
	)]
	fn fix_github_host(#[case] base_url: &str, #[case] url: &str, #[case] expected_url: &str) {
		let client: Client = RoundRobinClient::new(Config {
			base_url: base_url.to_string(),
			personal_access_tokens: "token".to_string(),
			..Default::default()
		})
		.unwrap()
		.into();

		let result_url = client.fix_github_host(&url.parse().unwrap()).unwrap();
		assert_eq!(result_url, expected_url.parse().unwrap());
	}
}
