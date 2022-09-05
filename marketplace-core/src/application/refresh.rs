use std::sync::Arc;

use marketplace_domain::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	ProjectionRepository(#[from] ProjectionRepositoryError),
	#[error(transparent)]
	EventStore(#[from] EventStoreError),
}

pub struct Refresh<P, A: Aggregate> {
	projection_repository: Arc<dyn ProjectionRepository<P>>,
	projector: Arc<dyn Projector<A>>,
	event_store: Arc<dyn EventStore<A>>,
}

impl<P, A: Aggregate> Refresh<P, A> {
	pub fn new(
		projection_repository: Arc<dyn ProjectionRepository<P>>,
		projector: Arc<dyn Projector<A>>,
		event_store: Arc<dyn EventStore<A>>,
	) -> Self {
		Self {
			projection_repository,
			projector,
			event_store,
		}
	}

	pub async fn refresh_projection_from_events(&self) -> Result<(), Error> {
		self.projection_repository.clear()?;

		let events = self.event_store.list()?;

		for event in events.iter() {
			self.projector.project(event).await;
		}

		Ok(())
	}
}
