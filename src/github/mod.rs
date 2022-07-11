mod models;

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
    pub fn new() -> Self {
        API {
            octo: octocrab::instance(),
        }
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

        Ok(Streamable::Async(
            stream::once(async { repo.into() }).into(),
        ))
    }
}
