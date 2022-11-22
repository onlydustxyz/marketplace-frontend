use crate::{
	specifications::{Error, Specifications},
	AggregateRootRepositoryError, ProjectId,
};

impl Specifications {
	pub async fn project_exists(&self, project_id: &ProjectId) -> Result<bool, Error> {
		match self.project_repository.find_by_id(project_id) {
			Ok(_) => Ok(true),
			Err(e) => match e {
				AggregateRootRepositoryError::NotFound => Ok(false),
				AggregateRootRepositoryError::EventStoreError(_) => Err(Error::EventStore(e)),
			},
		}
	}
}
