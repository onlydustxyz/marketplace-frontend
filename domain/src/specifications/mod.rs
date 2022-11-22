use crate::{
	aggregate_root, specifications::project_exists::Specification as ProjectExistsSpecification,
	AggregateRootRepository, Project,
};
use async_trait::async_trait;
use std::sync::Arc;
use thiserror::Error;

mod project_exists;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}

#[async_trait]
pub trait Specifications: ProjectExistsSpecification + Send + Sync {}

pub struct SpecificationsImpl {
	project_repository: Arc<AggregateRootRepository<Project>>,
}

impl SpecificationsImpl {
	pub fn new(project_repository: Arc<AggregateRootRepository<Project>>) -> Self {
		SpecificationsImpl { project_repository }
	}
}

impl Specifications for SpecificationsImpl {}

#[cfg(test)]
pub mod tests {
	use super::Error;
	use crate::{
		specifications::project_exists::Specification as ProjectExistsSpecification, ProjectId,
	};
	use async_trait::async_trait;
	use mockall::mock;

	mock! {
		pub Specifications {}

		#[async_trait]
		impl ProjectExistsSpecification for Specifications {
			async fn project_exists(&self, project_id: &ProjectId) -> Result<bool, Error>;
		}

		#[async_trait]
		impl super::Specifications for Specifications {}
	}
}
