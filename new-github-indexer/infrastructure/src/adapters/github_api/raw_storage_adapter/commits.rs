use domain::{
	models::{CheckRuns, RepositoryId},
	ports::output::raw_storage::*,
};

use crate::adapters::github_api::Client;

#[async_trait]
impl commits::Port for Client {
	async fn commit_check_runs_by_repo_id(
		&self,
		repo_id: RepositoryId,
		sha: String,
	) -> Result<CheckRuns> {
		self.get_as(format!("/repositories/{repo_id}/commits/{sha}/check-runs",))
			.await
			.map_err(Into::into)
	}
}
