use super::Result;
use crate::models::{issues::Issue, RepositoryId};

#[async_trait]
pub trait Port: Send + Sync {
	async fn issue_by_repo_id(&self, repo_id: RepositoryId, issue_number: u64) -> Result<Issue>;

	async fn issue_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: u64,
	) -> Result<Issue>;
}
