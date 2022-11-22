use crate::{
	specifications::Error, AggregateRootRepository, AggregateRootRepositoryError, Project,
	ProjectId,
};
#[cfg(test)]
use mockall::automock;
use std::sync::Arc;

pub struct Specification {
	project_repository: Arc<AggregateRootRepository<Project>>,
}

#[cfg_attr(test, automock)]
impl Specification {
	pub fn new(project_repository: Arc<AggregateRootRepository<Project>>) -> Self {
		Self { project_repository }
	}

	pub async fn is_satisfied_by(&self, project_id: &ProjectId) -> Result<bool, Error> {
		match self.project_repository.find_by_id(project_id) {
			Ok(_) => Ok(true),
			Err(e) => match e {
				AggregateRootRepositoryError::NotFound => Ok(false),
				AggregateRootRepositoryError::EventStoreError(_) => Err(Error::EventStore(e)),
			},
		}
	}
}
