use serde::Deserialize;

use crate::domain::*;

#[derive(Deserialize)]
pub struct RepositoryWithExtension {
    #[serde(flatten)]
    pub inner: octocrab::models::Repository,
    pub open_issues: u32,
}

impl From<octocrab::models::pulls::PullRequest> for Contribution {
    fn from(pr: octocrab::models::pulls::PullRequest) -> Self {
        Self {
            id: pr.id.to_string(),
            author: pr
                .user
                .expect("Invalid user received from github API")
                .id
                .to_string(),
            status: ContributionStatus::Merged, // TODO compute status
            project_id: pr
                .base
                .repo
                .expect("Invalid repo received from github API")
                .id
                .to_string(),
            gate: 0,
        }
    }
}
