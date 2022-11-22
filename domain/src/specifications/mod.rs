use crate::{
	aggregate_root, specifications::project::ProjectSpecifications, AggregateRootRepository,
	Project,
};
use async_trait::async_trait;
use std::sync::Arc;
use thiserror::Error;

mod project;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}

#[async_trait]
pub trait Specifications: ProjectSpecifications + Send + Sync {}

pub struct SpecificationsImpl {
	project_repository: Arc<AggregateRootRepository<Project>>,
}

impl SpecificationsImpl {
	pub fn new(project_repository: Arc<AggregateRootRepository<Project>>) -> Self {
		SpecificationsImpl { project_repository }
	}
}

impl Specifications for SpecificationsImpl {}
