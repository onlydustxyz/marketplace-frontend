use super::Client;
use async_trait::async_trait;
use marketplace_domain::{
	GithubProjectId, GithubRepo, GithubRepoRepository, GithubRepoRepositoryError,
};

#[async_trait]
impl GithubRepoRepository for Client {
	async fn find(
		&self,
		project_id: &GithubProjectId,
	) -> Result<Option<GithubRepo>, GithubRepoRepositoryError> {
		let repository = self
			.repository_by_id(project_id.to_owned())
			.await
			.map_err(|e| GithubRepoRepositoryError::Infrastructure(e.to_string()))?;

		Ok(Some(GithubRepo {
			project_id: repository.id.0,
			owner: repository.owner.map(|user| user.login).unwrap_or_default(),
			name: repository.name,
		}))
	}
}
