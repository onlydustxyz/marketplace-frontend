use std::{str::FromStr, sync::Arc};

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{Aggregate, Event, EventStore};
use event_listeners::domain::EventListener;

#[derive(Constructor)]
pub struct Refresher<A: Aggregate> {
	event_store: Arc<dyn EventStore<A>>,
	projector: Arc<dyn EventListener>,
}

#[async_trait]
pub trait Refreshable {
	async fn refresh(&self, id: &str) -> Result<()>;
}

#[async_trait]
impl<A: Aggregate> Refreshable for Refresher<A>
where
	Event: From<<A as Aggregate>::Event>,
	A::Id: FromStr,
{
	async fn refresh(&self, id: &str) -> Result<()> {
		let id = A::Id::from_str(id).map_err(|_| anyhow!("Unable to parse aggregate id"))?;
		for event in self.event_store.list_by_id(&id)? {
			self.projector.on_event(&event.into()).await?;
		}
		Ok(())
	}
}
