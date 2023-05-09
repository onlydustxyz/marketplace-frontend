use infrastructure::database::Client;

use crate::domain::{GithubUserIndexRepository, RepositoryResult};

impl GithubUserIndexRepository for Client {
	fn exists(&self, repo_id: &domain::GithubUserId) -> RepositoryResult<bool> {
		todo!()
	}

	fn try_insert(
		&self,
		repo_id: &domain::GithubUserId,
		is_registered: bool,
	) -> RepositoryResult<()> {
		todo!()
	}
}
