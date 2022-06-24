use serde::Deserialize;

use crate::model::pullrequest;

#[derive(Deserialize)]
pub struct RepositoryWithExtension {
    #[serde(flatten)]
    pub inner: octocrab::models::Repository,
    pub open_issues: u32,
}

impl From<octocrab::models::pulls::PullRequest> for pullrequest::PullRequest {
    fn from(pr: octocrab::models::pulls::PullRequest) -> Self {
        Self {
            id: pr.id.to_string(),
            author: pr
                .user
                .expect("Invalid user received from github API")
                .id
                .to_string(),
            status: pullrequest::Status::Merged, // TODO compute status
            repository_id: pr
                .base
                .repo
                .expect("Invalid repo received from github API")
                .id
                .to_string(),
        }
    }
}
