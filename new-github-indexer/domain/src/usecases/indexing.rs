use std::sync::Arc;

use crate::{
	models::RepositoryId,
	ports::{
		input::indexing_facade_port::IndexingFacadePort,
		output::{clean_storage::CleanStoragePort, github_api},
	},
};

pub struct Usecase {
	_github_api: Arc<dyn github_api::Port>,
	_clean_storage: Arc<dyn CleanStoragePort>,
}

#[async_trait]
impl IndexingFacadePort for Usecase {
	async fn index_repo(
		&self,
		_repo_id: RepositoryId,
	) -> crate::ports::input::indexing_facade_port::Result<()> {
		// let repo = self.github_api.repo_by_id(repo_id).await?;
		// self.clean_storage.save_repo(repo)?;
		//TODO: expose data in the exposition storage
		Ok(())
	}
}
