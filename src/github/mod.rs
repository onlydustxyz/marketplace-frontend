mod models;

use anyhow::Result;
use async_trait::async_trait;
use futures::stream;
use log::info;
use std::sync::Arc;

use crate::{domain::*, utils::stream::Streamable};

impl From<models::RepositoryWithExtension> for Project {
    fn from(repo: models::RepositoryWithExtension) -> Self {
        Self {
            id: repo.inner.id.to_string(),
            owner: repo
                .inner
                .owner
                .expect("Invalid repo owner received from github API")
                .login,
            name: repo.inner.name,
        }
    }
}

pub struct API {
    octo: Arc<octocrab::Octocrab>,
}

impl API {
    pub fn initialize() {
        let mut builder = octocrab::Octocrab::builder();

        if let Some(github_token) = std::env::var("GITHUB_TOKEN").ok() {
            builder = builder.personal_token(github_token);
        }

        octocrab::initialise(builder).expect("Unable to initialize octocrab");
    }

    pub fn new() -> Self {
        API {
            octo: octocrab::instance(),
        }
    }

    pub async fn issue(
        &self,
        contribution_id: &ContributionId,
    ) -> Result<octocrab::models::issues::Issue> {
        let contribution_id: u128 = contribution_id
            .parse()
            .expect("contribution_id is not a number");

        const PROJECT_MULTIPLIER: u128 = 1_000_000;
        let project_id_ = contribution_id / PROJECT_MULTIPLIER;
        let issue_number = contribution_id % PROJECT_MULTIPLIER;

        self.octo
            .get::<octocrab::models::issues::Issue, String, ()>(
                format!(
                    "{}repositories/{}/issues/{}",
                    self.octo.base_url, project_id_, issue_number
                ),
                None,
            )
            .await
            .map_err(anyhow::Error::msg)
    }

    pub async fn repository_by_id(
        &self,
        project_id_: &str,
    ) -> Result<octocrab::models::Repository> {
        self.octo
            .get::<octocrab::models::Repository, String, ()>(
                format!("{}repositories/{}", self.octo.base_url, project_id_),
                None,
            )
            .await
            .map_err(anyhow::Error::msg)
    }
}

impl Default for API {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl Fetcher<ProjectFilter, Project> for API {
    async fn fetch(&self, filter: ProjectFilter) -> FetchResult<Project> {
        info!("Fetching repository with filter {:?}", filter);

        let repo = self
            .octo
            .get::<models::RepositoryWithExtension, String, ()>(
                format!(
                    "{}repos/{}/{}",
                    self.octo.base_url,
                    filter.owner.expect("Repository owner is mandatory"),
                    filter.name.expect("Repository name is mandatory")
                ),
                None::<&()>,
            )
            .await?;

        Ok(Streamable::Async(
            stream::once(async { repo.into() }).into(),
        ))
    }
}
