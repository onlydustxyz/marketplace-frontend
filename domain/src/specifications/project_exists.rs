use crate::{
	specifications::{Error, SpecificationsImpl},
	AggregateRootRepositoryError, ProjectId,
};
use async_trait::async_trait;

#[async_trait]
pub trait Specification {
	async fn project_exists(&self, project_id: &ProjectId) -> Result<bool, Error>;
}

#[async_trait]
impl Specification for SpecificationsImpl {
	async fn project_exists(&self, project_id: &ProjectId) -> Result<bool, Error> {
		match self.project_repository.find_by_id(project_id) {
			Ok(_) => Ok(true),
			Err(e) => match e {
				AggregateRootRepositoryError::NotFound => Ok(false),
				AggregateRootRepositoryError::EventStoreError(_) => Err(Error::EventStore(e)),
			},
		}
	}
}
