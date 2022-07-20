mod models;

use anyhow::Result;
use std::sync::Arc;

use crate::domain::*;

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

        if let Ok(github_token) = std::env::var("GITHUB_TOKEN") {
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
        let contribution_id: u128 = contribution_id.parse().map_err(anyhow::Error::msg)?;

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

    pub async fn user(&self, user_id: &str) -> Result<octocrab::models::User> {
        self.octo
            .get::<octocrab::models::User, String, ()>(
                format!("{}user/{}", self.octo.base_url, user_id),
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

    pub async fn get_project_by_owner_and_name(&self, owner: &str, name: &str) -> Result<Project> {
        let repo = self
            .octo
            .get::<models::RepositoryWithExtension, String, ()>(
                format!("{}repos/{}/{}", self.octo.base_url, owner, name),
                None::<&()>,
            )
            .await?;

        Ok(repo.into())
    }
}

impl Default for API {
    fn default() -> Self {
        Self::new()
    }
}
