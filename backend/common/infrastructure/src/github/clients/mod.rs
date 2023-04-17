use std::{fmt::Debug, future::ready, pin::Pin};

use anyhow::anyhow;
use domain::{
	GithubIssueNumber, GithubRepoLanguages, GithubRepositoryId, GithubServiceFilters, GithubUserId,
	PositiveCount,
};
use futures::{stream::empty, Stream, StreamExt, TryStreamExt};
use octocrab::{
	models::{
		events::Event,
		issues::{Comment, Issue},
		pulls::PullRequest,
		repos::Content,
		Repository, User,
	},
	params::{pulls::Sort, Direction},
	FromResponse, Octocrab,
};
use olog::tracing::instrument;
use reqwest::Url;

use super::{logged_response::LoggedResponse, service::QueryParams, AddHeaders, Config, Error};

mod round_robin;
pub use round_robin::Client as RoundRobinClient;

mod single;
pub use single::Client as SingleClient;

mod stream_filter;
use olog::error;
use stream_filter::StreamFilterWith;

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

type EventStream<'a> = Pin<Box<dyn Stream<Item = Event> + Send + 'a>>;

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

	pub async fn get_issue_repository_id(
		&self,
		issue: &Issue,
	) -> Result<GithubRepositoryId, Error> {
		let repo = self.get_as::<_, Repository>(issue.repository_url.clone()).await?;
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
		let result: LoggedResponse<R> = self.octocrab().get(url, None::<&()>).await?;
		Ok(result.0)
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
					.inspect_err(|e| error!(error = e.to_string(), "Unable to stream from github"))
					.take_while(|res| ready(res.is_ok()))
					.map(Result::unwrap)
					.boxed()
			})
			.unwrap_or_else(|| empty().boxed()))
	}

	#[instrument(skip(self))]
	pub async fn stream_repo_events(
		&self,
		repo_owner: &str,
		repo_name: &str,
	) -> Result<EventStream<'_>, Error> {
		let first_page = self
			.octocrab()
			.repos(repo_owner, repo_name)
			.events()
			.per_page(100)
			.send()
			.await?;

		let stream = first_page
			.value
			.map(|page| {
				page.into_stream(self.octocrab())
					.inspect_err(|e| {
						error!(
							error = e.to_string(),
							"Unable to stream repo events from github"
						)
					})
					.take_while(|res| ready(res.is_ok()))
					.map(Result::unwrap)
					.boxed()
			})
			.unwrap_or_else(|| empty().boxed());

		Ok(stream)
	}

	#[instrument(skip(self))]
	pub async fn get_repository_by_id(&self, id: &GithubRepositoryId) -> Result<Repository, Error> {
		self.get_as(format!("{}repositories/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn get_languages_by_repository_id(
		&self,
		id: &GithubRepositoryId,
	) -> Result<GithubRepoLanguages, Error> {
		self.get_as(format!(
			"{}repositories/{id}/languages",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	pub async fn get_current_user(&self) -> Result<User, Error> {
		let user = self.octocrab().current().user().await?;
		Ok(user)
	}

	#[instrument(skip(self))]
	pub async fn get_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<Issue, Error> {
		let issue_number: i64 = (*issue_number).into();
		let issue = self.octocrab().issues(repo_owner, repo_name).get(issue_number as u64).await?;
		Ok(issue)
	}

	#[instrument(skip(self))]
	pub async fn get_issue_by_repository_id(
		&self,
		repo_id: &GithubRepositoryId,
		issue_number: &GithubIssueNumber,
	) -> Result<Issue, Error> {
		self.get_as(format!(
			"{}repositories/{repo_id}/issues/{issue_number}",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_name(&self, username: &str) -> Result<User, Error> {
		self.get_as(format!("{}users/{username}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn pulls_by_repo_id(
		&self,
		id: &GithubRepositoryId,
		filters: &GithubServiceFilters,
	) -> Result<Vec<PullRequest>, Error> {
		let query_params = QueryParams::default()
			.state(filters.state.into())
			.sort(Sort::Created)
			.direction(Direction::Descending)
			.page(1)
			.per_page(100);

		let url = format!(
			"{}repositories/{id}/pulls?{}",
			self.octocrab().base_url,
			query_params.to_query_string()?
		)
		.parse()?;

		let pulls = self
			.stream_as::<PullRequest>(
				url,
				100 * self.config().max_calls_per_request.map(PositiveCount::get).unwrap_or(3),
			)
			.await?
			.filter_with(*filters)
			.collect()
			.await;
		Ok(pulls)
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_id(&self, id: &GithubUserId) -> Result<User, Error> {
		self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await
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

	pub fn fix_github_host(&self, url: &Option<Url>) -> anyhow::Result<Option<Url>> {
		Ok(match url {
			Some(url) => Some(
				format!(
					"{}{}",
					self.octocrab().base_url.as_str().trim_end_matches('/'),
					url.path()
				)
				.parse()?,
			),
			None => None,
		})
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case("http://plop.fr/github/", Some("https://api.github.com/repos/ning-rain/evens/contributors".parse().unwrap()), Some("http://plop.fr/github/repos/ning-rain/evens/contributors".parse().unwrap()))]
	#[case("http://plop.fr/github", Some("https://api.github.com/repos/ning-rain/evens/contributors".parse().unwrap()), Some("http://plop.fr/github/repos/ning-rain/evens/contributors".parse().unwrap()))]
	#[case("http://plop.fr/github/", Some("https://api.github.com".parse().unwrap()), Some("http://plop.fr/github/".parse().unwrap()))]
	#[case("http://plop.fr/github", Some("https://api.github.com".parse().unwrap()), Some("http://plop.fr/github/".parse().unwrap()))]
	#[case("http://plop.fr/github/", None, None)]
	fn fix_github_host(
		#[case] base_url: &str,
		#[case] url: Option<reqwest::Url>,
		#[case] expected_url: Option<reqwest::Url>,
	) {
		let client: Client = RoundRobinClient::new(&Config {
			base_url: base_url.to_string(),
			personal_access_tokens: "token".to_string(),
			..Default::default()
		})
		.unwrap()
		.into();

		let result_url = client.fix_github_host(&url).unwrap();
		assert_eq!(result_url, expected_url);
	}
}
