use anyhow::Result;
use futures::future::join_all;
use marketplace_domain::ProjectMemberProjector;
use marketplace_infrastructure::{
	database::{self, init_pool},
	event_bus,
};
use std::sync::Arc;
use tokio::task::JoinHandle;

mod logger;
mod projector;

pub async fn main() -> Result<()> {
	let database = Arc::new(database::Client::new(init_pool()?));

	join_all(spawn_listeners(database).await?)
		.await
		.into_iter()
		.collect::<Result<Vec<()>, _>>()?;

	Ok(())
}

async fn spawn_listeners(database: Arc<database::Client>) -> Result<Vec<JoinHandle<()>>> {
	let handles = [
		logger::spawn(event_bus::consumer().await?),
		ProjectMemberProjector::new(database).spawn(event_bus::consumer().await?),
	];
	Ok(handles.into())
}

trait Spawnable {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()>;
}

impl<EL: EventListener + 'static> Spawnable for EL {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()> {
		projector::spawn(bus, Arc::new(self))
	}
}
