use std::fmt::Debug;

use anyhow::anyhow;
use domain::{
	GithubIssueNumber, GithubRepoLanguages, GithubRepositoryId, GithubServiceFilters, GithubUserId,
};
use futures::{Stream, StreamExt, TryStreamExt};
use octocrab::{
	models::{issues::Issue, pulls::PullRequest, repos::Content, Repository, User},
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
	async fn stream_as<R: serde::de::DeserializeOwned + 'static>(
		&self,
		url: Url,
	) -> Result<Option<impl Stream<Item = Result<R, octocrab::Error>> + '_>, Error> {
		// TODO find a way to return an empty stream instead of option
		let stream = self
			.octocrab()
			.get_page::<R>(&Some(url))
			.await?
			.map(|page| page.into_stream(self.octocrab()).take(100));
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
			.sort(Sort::Updated)
			.direction(Direction::Descending)
			.page(1)
			.per_page(100);

		let url = format!(
			"{}repositories/{id}/pulls?{}",
			self.octocrab().base_url,
			query_params.to_query_string()?
		)
		.parse()?;

		let pulls = match self.stream_as(url).await? {
			Some(stream) => stream.try_collect().await?,
			None => Default::default(),
		};

		Ok(pulls)
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_id(&self, id: &GithubUserId) -> Result<User, Error> {
		self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await
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
	use std::collections::HashMap;

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
			headers: HashMap::new(),
		})
		.unwrap()
		.into();

		let result_url = client.fix_github_host(&url).unwrap();
		assert_eq!(result_url, expected_url);
	}
}
