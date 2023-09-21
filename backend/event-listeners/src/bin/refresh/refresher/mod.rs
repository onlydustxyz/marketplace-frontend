use std::{str::FromStr, sync::Arc};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Event, EventListener, EventSourcable, EventStore, Identified};
use event_listeners::listeners::*;
use infrastructure::{database, event_store::Named};
use itertools::Itertools;
use olog::info;
pub use registry::{Registrable, Registry};

mod registry;

#[derive(Constructor)]
pub struct Refresher<A: EventSourcable> {
	event_store: Arc<dyn EventStore<A>>,
	projector: Arc<dyn EventListener<Event>>,
}

#[async_trait]
pub trait Refreshable {
	fn all_ids(&self) -> Result<Vec<String>>;
	async fn refresh(&self, id: &str) -> Result<()>;
}

#[async_trait]
impl<A: EventSourcable> Refreshable for Refresher<A>
where
	Event: From<A::Event>,
	A::Id: FromStr,
{
	fn all_ids(&self) -> Result<Vec<String>> {
		let ids = self
			.event_store
			.list()
			.map_err(|_| anyhow!("Could not list event ids from store"))?
			.into_iter()
			.map(|e| e.id().to_string())
			.unique()
			.collect();

		Ok(ids)
	}

	async fn refresh(&self, id: &str) -> Result<()> {
		info!(
			"Refreshing {} {id}",
			std::any::type_name::<A>().split(':').last().unwrap_or_default()
		);
		let id = A::Id::from_str(id).map_err(|_| anyhow!("Unable to parse aggregate id"))?;
		let events = self.event_store.list_by_id(&id)?;

		if events.is_empty() {
			return Err(anyhow!("No event found"));
		}

		for event in events {
			self.projector.on_event(event.into()).await?;
		}
		Ok(())
	}
}

pub fn create<A: EventSourcable + Named>(database: Arc<database::Client>) -> impl Refreshable
where
	Event: From<A::Event>,
	A::Id: FromStr,
{
	let projector = projections::Projector::new(
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
	);

	Refresher::<A>::new(database, Arc::new(projector))
}
