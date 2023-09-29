use std::sync::Arc;

use async_trait::async_trait;

use crate::ports::{
	input::indexing_facade_port::IndexingFacadePort,
	output::{clean_storage::CleanStoragePort, github_api::GithubApiPort},
};

pub struct Usecase {
	github_api: Arc<dyn GithubApiPort>,
	clean_storage: Arc<dyn CleanStoragePort>,
}

#[async_trait]
impl IndexingFacadePort for Usecase {
	async fn index_repo(
		&self,
		repo_id: u64,
	) -> crate::ports::input::indexing_facade_port::Result<()> {
		let repo = self.github_api.repo_by_id(repo_id).await?;
		self.clean_storage.save_repo(repo)?;
		//TODO: expose data in the exposition storage
		Ok(())
	}
}
