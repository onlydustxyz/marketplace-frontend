/// This module contains the `Client` type and its methods for interacting with the Github API.
///
/// Because Github has rate limiting for API requests, this module provides two implementations
/// of the `Client` type:
/// 1. `SingleClient` which makes all API requests through a single Github account.
/// 2. `RoundRobinClient` which uses a pool of Github accounts to make API requests in a round-robin fashion.
///
/// Both types implement the `octocrab::Octocrab` trait and provide a uniform interface for interacting with
/// the Github API.
///
/// # Examples
/// ```
/// use anyhow::Error;
/// use github_service::{RoundRobinClient, Config};
///
/// #[tokio::main]
/// async fn main() -> Result<(), Error> {
///     let client: RoundRobinClient = RoundRobinClient::new(&Config::default())?.into();
///
///     // Search for repositories with the query "rust language"
///     let repos = client.search_issues("rust language", None, None, None, None).await?;
///     println!("Found {} repositories!", repos.len());
///
///     Ok(())
/// }
/// ```
use std::{
    fmt::Debug,
    future::{self, ready},
    pin::Pin,
    sync::Arc,
};

use anyhow::anyhow;
use domain::{
    stream_filter::{self, StreamFilterWith},
    GithubIssue, GithubIssueNumber, GithubRepoId, GithubRepoLanguages, GithubServiceIssueFilters,
    GithubUser, GithubUserId, PositiveCount,
};
use futures::{stream::empty, Stream, StreamExt, TryStreamExt};
use octocrab::{
    models::{
        issues::{Comment, Issue},
        repos::Content,
        Repository, User,
    },
    params::{pulls::Sort, Direction},
    FromResponse, Octocrab,
};
use olog::tracing::instrument;
use reqwest::Url;

use super::{service::QueryParams, AddHeaders, Config, Error, IssueFromOctocrab};

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
    /// Returns a reference to the underlying `Octocrab` instance.
    pub fn octocrab(&self) -> &Octocrab {
        match self {
            Client::Single(client) => client.octocrab(),
            Client::RoundRobin(client) => client.octocrab(),
        }
    }

    /// Returns a reference to the client configuration options.
    pub fn config(&self) -> &Config {
        match self {
            Client::Single(client) => client.config(),
            Client::RoundRobin(client) => client.config(),
        }
    }

    /// Returns the repository ID corresponding to the provided `Issue` using the Github API.
    pub async fn get_issue_repository_id(&self, issue: &Issue) -> Result<GithubRepoId, Error> {
        let repository_url = self.fix_github_host(&issue.repository_url).map_err(Error::Other)?;
        let repo = self.get_as::<_, Repository>(repository_url).await?;
        Ok((repo.id.0 as i64).into())
    }

    /// Search users using the Github Search API
    ///
    /// See [GitHub's API documentation](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-users) for more information.
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
    ///
    /// See [GitHub's API documentation](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-issues-and-pull-requests) for more information.
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

    /// Sends a GET request to the specified url and deserializes the response as the provided
    /// type.
    #[instrument(skip(self))]
    pub async fn get_as<U, R>(&self, url: U) -> Result<R, Error>
    where
        U: AsRef<str> + Debug + Send,
        R: FromResponse,
    {
        let response = self.octocrab().get(url, None::<&()>).await?;
        Ok(response)
    }

    /// Streams the pages of a paginated API endpoint using the Github API and applies the specified
    /// maximum number of results