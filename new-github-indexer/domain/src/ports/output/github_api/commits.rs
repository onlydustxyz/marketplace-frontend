use super::Result;
use crate::models::{CheckRuns, RepositoryId};

#[async_trait]
pub trait Port: Send + Sync {
	async fn commit_check_runs_by_repo_id(
		&self,
		repo_id: RepositoryId,
		sha: String,
	) -> Result<CheckRuns>;
}
