use std::{str::FromStr, sync::Arc};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Aggregate, AggregateEvent, Event, EventStore};
use event_listeners::domain::EventListener;

mod registry;
use itertools::Itertools;
use olog::info;
pub use registry::{Registrable, Registry};

pub mod project;

#[derive(Constructor)]
pub struct Refresher<A: Aggregate> {
	event_store: Arc<dyn EventStore<A>>,
	projectors: Vec<Arc<dyn EventListener>>,
}

#[async_trait]
pub trait Refreshable {
	fn all_ids(&self) -> Result<Vec<String>>;
	async fn refresh(&self, id: &str) -> Result<()>;
}

#[async_trait]
impl<A: Aggregate> Refreshable for Refresher<A>
where
	Event: From<<A as Aggregate>::Event>,
	A::Id: FromStr,
{
	fn all_ids(&self) -> Result<Vec<String>> {
		let ids = self
			.event_store
			.list()
			.map_err(|_| anyhow!("Could not list event ids from store"))?
			.into_iter()
			.map(|e| e.aggregate_id().to_string())
			.unique()
			.collect();

		Ok(ids)
	}

	async fn refresh(&self, id: &str) -> Result<()> {
		info!("Refreshing entity {id}");
		let id = A::Id::from_str(id).map_err(|_| anyhow!("Unable to parse aggregate id"))?;
		let events = self.event_store.list_by_id(&id)?;

		if events.is_empty() {
			return Err(anyhow!("No event found"));
		}

		for event in events {
			let event: Event = event.into();
			for projector in &self.projectors {
				projector.on_event(&event).await?;
			}
		}
		Ok(())
	}
}
