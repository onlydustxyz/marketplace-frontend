use domain::GithubUserId;

use super::Result;

pub trait Repository: Send + Sync {
	fn exists(&self, repo_id: &domain::GithubUserId) -> Result<bool>;
	fn try_insert(&self, repo_id: &GithubUserId, is_registered: bool) -> Result<()>;
}
