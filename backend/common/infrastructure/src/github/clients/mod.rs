use std::{fmt::Debug, future, pin::Pin, sync::Arc};

use anyhow::{anyhow, Context};
use domain::{
	stream_filter::{self, StreamFilterWith},
	GithubFullUser, GithubIssue, GithubIssueNumber, GithubPullRequest, GithubPullRequestNumber,
	GithubRepoId, GithubServiceIssueFilters, GithubServicePullRequestFilters, GithubUser,
	GithubUserId, Languages, LogErr, PositiveCount,
};
use futures::{stream::empty, Stream, StreamExt, TryStreamExt};
use octocrab::{
	models::{
		issues::{Comment, Issue},
		pulls::{PullRequest, Review},
		repos::{Content, RepoCommit},
		CheckRuns, Repository, User,
	},
	params::{pulls::Sort, Direction},
	FromResponse, Octocrab,
};
use olog::{tracing::instrument, IntoField};
use reqwest::Url;
use serde_json::json;

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

impl From<SingleClient> for Arc<Client> {
	fn from(client: SingleClient) -> Self {
		Arc::new(Client::Single(client))
	}
}

impl From<RoundRobinClient> for Arc<Client> {
	fn from(client: RoundRobinClient) -> Self {
		Arc::new(Client::RoundRobin(client))
	}
}

impl Client {
	pub fn octocrab(&self) -> &Octocrab {
		match &self {
			Self::Single(client) => client.octocrab(),
			Self::RoundRobin(client) => client.octocrab(),
		}
	}

	pub fn config(&self) -> &Config {
		match &self {
			Self::Single(client) => client.config(),
			Self::RoundRobin(client) => client.config(),
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
					.take_while(|res| future::ready(res.is_ok()))
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
	pub async fn get_pull_request(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<PullRequest, Error> {
		let pull_request_number: i64 = pull_request_number.into();
		let pull_request = self
			.octocrab()
			.pulls(repo_owner, repo_name)
			.get(pull_request_number as u64)
			.await?;
		Ok(pull_request)
	}

	#[instrument(skip(self))]
	pub async fn get_check_runs(
		&self,
		repo_id: GithubRepoId,
		sha: String,
	) -> Result<CheckRuns, Error> {
		let check_runs: CheckRuns = self
			.get_as(format!(
				"{}repositories/{repo_id}/commits/{sha}/check-runs",
				self.octocrab().base_url,
			))
			.await
			.context("Fetching CI check runs")
			.map_err(Error::NotFound)?;

		Ok(check_runs)
	}

	#[instrument(skip(self))]
	pub async fn get_commits(
		&self,
		repo_id: GithubRepoId,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<Vec<RepoCommit>, Error> {
		let commits: Vec<RepoCommit> = self
			.stream_as(
				format!(
					"{}repositories/{repo_id}/pulls/{pull_request_number}/commits",
					self.octocrab().base_url,
				)
				.parse()?,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.collect()
			.await;

		Ok(commits)
	}

	#[instrument(skip(self))]
	pub async fn get_reviews(
		&self,
		repo_id: GithubRepoId,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<Vec<Review>, Error> {
		let reviews: Vec<Review> = self
			.stream_as(
				format!(
					"{}repositories/{repo_id}/pulls/{pull_request_number}/reviews",
					self.octocrab().base_url,
				)
				.parse()?,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.collect()
			.await;

		Ok(reviews)
	}

	#[instrument(skip(self))]
	pub async fn get_closing_issues(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: GithubPullRequestNumber,
	) -> Result<Vec<GithubIssueNumber>, Error> {
		let response: serde_json::Value = self
			.octocrab()
			.post(
				"graphql",
				Some(&json!({
					"query": r#"query GetClosingIssues($owner: String!, $name: String!, $number: Int!) {
						repository(owner: $owner, name: $name) {
						 pullRequest(number: $number) {
						   closingIssuesReferences(first: 10) {
							 nodes {
							   number
							 }
						   }
						 }
					   }
					 }"#,
					 "variables": {
						"owner": repo_owner,
						"name": repo_name,
						"number": pull_request_number,
					 }
				})),
			)
			.await?;

		let issue_numbers = response
			.pointer("/data/repository/pullRequest/closingIssuesReferences/nodes")
			.and_then(|nodes| {
				nodes.as_array().map(|nodes| {
					nodes
						.iter()
						.filter_map(|node| {
							node.pointer("/number")
								.and_then(|number| number.as_i64().map(GithubIssueNumber::from))
						})
						.collect::<Vec<_>>()
				})
			})
			.unwrap_or_default();

		Ok(issue_numbers)
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
			.filter_map(|issue| try_into_issue(id, issue))
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
			.filter_map(|pull_request| try_into_pull_request(id, pull_request))
			.filter_with(Arc::new(filters))
			.collect()
			.await;
		Ok(pull_requests)
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

async fn try_into_pull_request(
	repo_id: GithubRepoId,
	pull_request: PullRequest,
) -> Option<domain::GithubPullRequest> {
	let pull_request_id = pull_request.id;

	GithubPullRequest::from_octocrab(pull_request)
		.log_err(|e| {
			error!(
				error = e.to_field(),
				repository_id = repo_id.to_string(),
				pull_request_id = pull_request_id.0,
				"Failed to process pull_request"
			)
		})
		.ok()
}

async fn try_into_issue(repo_id: GithubRepoId, issue: Issue) -> Option<domain::GithubIssue> {
	if issue.pull_request.is_some() {
		None
	} else {
		match GithubIssue::from_octocrab(issue.clone(), repo_id) {
			Ok(issue) => Some(issue),
			Err(e) => {
				error!(
					error = e.to_field(),
					repository_id = repo_id.to_string(),
					issue_id = issue.id.0,
					"Failed to process issue"
				);
				None
			},
		}
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
		let client: Arc<Client> = RoundRobinClient::new(Config {
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
