use serde::Deserialize;
use std::fmt;

#[derive(Deserialize)]
pub struct RepositoryWithExtension {
    #[serde(flatten)]
    pub inner: octocrab::models::Repository,
    pub open_issues: u32,
}

pub enum PullRequestStatus {
    None = 0,
    Open = 1,
    Review = 2,
    Merged = 3,
}

impl fmt::Display for PullRequestStatus {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            PullRequestStatus::None => write!(f, "0"),
            PullRequestStatus::Open => write!(f, "1"),
            PullRequestStatus::Review => write!(f, "2"),
            PullRequestStatus::Merged => write!(f, "3"),
        }
    }
}
