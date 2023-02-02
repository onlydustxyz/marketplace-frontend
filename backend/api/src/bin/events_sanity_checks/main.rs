use std::{collections::HashSet, sync::Arc};

use anyhow::Result;
use api::Config;
use domain::{AggregateEvent, EventSourcable, EventStore, Payment, Project};
use dotenv::dotenv;
use infrastructure::{
	config,
	database::{init_pool, Client as DatabaseClient},
	tracing::Tracer,
};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "events_sanity_checks")?;

	let database = Arc::new(DatabaseClient::new(init_pool(config.database())?));

	check_events::<Project>(database.clone())?;
	check_events::<Payment>(database)?;

	Ok(())
}

fn check_events<A: EventSourcable>(event_store: Arc<dyn EventStore<A>>) -> Result<()> {
	let event_ids: HashSet<A::Id> =
		event_store.list()?.iter().map(|event| event.aggregate_id().clone()).collect();

	event_ids.iter().try_for_each(|id| -> Result<()> {
		let events = event_store.list_by_id(id)?;
		A::from_events(&events);
		Ok(())
	})
}
