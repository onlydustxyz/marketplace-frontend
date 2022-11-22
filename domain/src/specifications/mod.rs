use crate::{aggregate_root, AggregateRootRepository, Project};
use std::sync::Arc;
use thiserror::Error;

mod project;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}

pub struct Specifications {
	project_repository: Arc<AggregateRootRepository<Project>>,
}

impl Specifications {
	pub fn new(project_repository: Arc<AggregateRootRepository<Project>>) -> Self {
		Specifications { project_repository }
	}
}
