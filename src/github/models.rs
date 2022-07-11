use serde::Deserialize;

#[derive(Deserialize)]
pub struct RepositoryWithExtension {
    #[serde(flatten)]
    pub inner: octocrab::models::Repository,
    pub open_issues: u32,
}
