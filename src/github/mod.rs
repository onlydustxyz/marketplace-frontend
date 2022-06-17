mod models;

use anyhow::Result;
use async_trait::async_trait;
use log::debug;
use std::sync::Arc;

use crate::model::{pullrequest, repository};
use crate::traits::fetcher::Fetcher;

impl From<models::RepositoryWithExtension> for repository::Repository {
    fn from(repo: models::RepositoryWithExtension) -> Self {
        Self {
            owner: repo.inner.owner.unwrap().login,
            name: repo.inner.name,
        }
    }
}

pub struct API {
    octo: Arc<octocrab::Octocrab>,
}

impl API {
    pub fn new() -> Self {
        API {
            octo: octocrab::instance(),
        }
    }
}

impl From<octocrab::models::pulls::PullRequest> for pullrequest::PullRequest {
    fn from(pr: octocrab::models::pulls::PullRequest) -> Self {
        Self {
            id: pr.id.to_string(),
            author: pr.user.unwrap().id.to_string(),
            status: pullrequest::Status::Merged, // TODO compute status
        }
    }
}

#[async_trait]
impl Fetcher<pullrequest::Filter, pullrequest::PullRequest> for API {
    async fn fetch(&self, filter: pullrequest::Filter) -> Result<Vec<pullrequest::PullRequest>> {
        const MAX_PR_PER_PAGE: u8 = 100;

        debug!(
            "Entering analyze with args: {} - {}",
            filter.repository.owner, filter.repository.name
        );

        // List the closed PRs
        let mut current_page = self
            .octo
            .pulls(&filter.repository.owner, &filter.repository.name)
            .list()
            .state(octocrab::params::State::Closed)
            .direction(octocrab::params::Direction::Ascending)
            .per_page(MAX_PR_PER_PAGE)
            .send()
            .await?;

        // TODO implement iterator pattern for fetcher not to perform all queries at once
        let mut prs = current_page.take_items();
        while let Ok(Some(mut new_page)) = self.octo.get_page(&current_page.next).await {
            prs.extend(new_page.take_items());
            current_page = new_page;
        }

        Ok(prs
            .into_iter()
            .filter(|pr| pr.merged_at.is_some())
            .map(|pr| pr.into())
            .collect())
    }
}

#[async_trait]
impl Fetcher<repository::Filter, repository::Repository> for API {
    async fn fetch(&self, filter: repository::Filter) -> Result<Vec<repository::Repository>> {
        const GITHUB_API_ROOT: &str = "https://api.github.com";

        let repo = self
            .octo
            .get::<models::RepositoryWithExtension, String, ()>(
                format!(
                    "{}/repos/{}/{}",
                    GITHUB_API_ROOT,
                    filter.owner.expect("Repository owner is mandatory"),
                    filter.name.expect("Repository name is mandatory")
                ),
                None::<&()>,
            )
            .await?;

        Ok(vec![repo.into()])
    }
}
