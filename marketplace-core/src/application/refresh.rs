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

pub struct Refresh<P: Projection> {
	projection_repository: Arc<dyn ProjectionRepository<P>>,
	projector: Arc<dyn Projector<P>>,
	event_store: Arc<dyn EventStore<P::A>>,
}

impl<P: Projection> Refresh<P> {
	pub fn new(
		projection_repository: Arc<dyn ProjectionRepository<P>>,
		projector: Arc<dyn Projector<P>>,
		event_store: Arc<dyn EventStore<P::A>>,
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
