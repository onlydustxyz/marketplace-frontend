use std::{collections::HashMap, fmt::Debug};

use anyhow::anyhow;
use async_trait::async_trait;
use octocrab::{
	models::{issues::Issue, pulls::PullRequest, repos::Content, Repository, User},
	FromResponse, Octocrab, OctocrabBuilder,
};
use olog::tracing::instrument;
use reqwest::Url;
use serde::Deserialize;

mod clients;
pub use clients::{RoundRobinClient, SingleClient};

mod error;
pub use error::Error;

mod logged_response;
pub use logged_response::DebugTechnicalHeaders;
use logged_response::LoggedResponse;

#[derive(Deserialize, Clone)]
pub struct Config {
	base_url: String,
	personal_access_tokens: String,
	headers: HashMap<String, String>,
}

#[async_trait]
pub trait OctocrabProxy: Sync + Send {
	fn octocrab(&self) -> &Octocrab;

	/// Search users using the Github Search API
	/// See https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users for more info.
	#[instrument(skip(self))]
	async fn search_users(
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
	async fn search_issues(
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
	async fn get_as<U, R>(&self, url: U) -> Result<R, Error>
	where
		U: AsRef<str> + Debug + Send,
		R: FromResponse,
	{
		let result: LoggedResponse<R> = self.octocrab().get(url, None::<&()>).await?;
		Ok(result.0)
	}

	#[instrument(skip(self))]
	async fn get_repository_by_id(&self, id: u64) -> Result<Repository, Error> {
		self.get_as(format!("{}repositories/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	async fn get_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		pr_number: u64,
	) -> Result<Issue, Error> {
		let issue = self.octocrab().issues(repo_owner, repo_name).get(pr_number).await?;
		Ok(issue)
	}

	#[instrument(skip(self))]
	async fn get_issue_by_repository_id(
		&self,
		repo_id: u64,
		pr_number: u64,
	) -> Result<Issue, Error> {
		self.get_as(format!(
			"{}repositories/{repo_id}/issues/{pr_number}",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	async fn get_user_by_name(&self, username: &str) -> Result<User, Error> {
		self.get_as(format!("{}users/{username}", self.octocrab().base_url)).await
	}

	#[allow(non_snake_case)]
	#[instrument(skip(self))]
	async fn get_repository_PRs(&self, id: u64) -> Result<Vec<PullRequest>, Error> {
		self.get_as(format!(
			"{}repositories/{id}/pulls?state=all",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	async fn get_user_by_id(&self, id: u64) -> Result<User, Error> {
		self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	async fn get_raw_file(&self, repo: &Repository, path: &str) -> Result<Content, Error> {
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

	fn fix_github_host(&self, url: &Option<Url>) -> anyhow::Result<Option<Url>> {
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

trait AddHeaders: Sized {
	fn add_headers(self, headers: &HashMap<String, String>) -> anyhow::Result<Self>;
}

impl AddHeaders for OctocrabBuilder {
	fn add_headers(mut self, headers: &HashMap<String, String>) -> anyhow::Result<Self> {
		for (key, value) in headers {
			self = self.add_header(key.parse()?, value.clone());
		}
		Ok(self)
	}
}
