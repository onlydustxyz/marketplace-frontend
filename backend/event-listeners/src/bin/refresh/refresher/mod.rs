use std::{str::FromStr, sync::Arc};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Event, EventSourcable, EventStore, Identified};

mod registry;
use event_listeners::listeners::EventListener;
use itertools::Itertools;
use olog::info;
pub use registry::{Registrable, Registry};

pub mod application;
pub mod budget;
pub mod payment;
pub mod project;

#[derive(Constructor)]
pub struct Refresher<A: EventSourcable> {
	event_store: Arc<dyn EventStore<A>>,
	projectors: Vec<Arc<dyn EventListener<Event>>>,
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
			let event: Event = event.into();
			for projector in &self.projectors {
				projector.on_event(event.clone()).await?;
			}
		}
		Ok(())
	}
}
