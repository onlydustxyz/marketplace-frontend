use anyhow::Result;
use futures::future::try_join_all;
use marketplace_domain::{
	ContributorWithGithubDataProjector, Event, EventListener, ProjectLeadProjector, Subscriber,
	SubscriberCallbackError,
};
use marketplace_infrastructure::{
	amqp::ConsumableBus,
	database::{self, init_pool},
	event_bus, github,
};
use std::sync::Arc;
use tokio::task::JoinHandle;
use warp::Filter;

mod listeners;
use listeners::*;

mod presentation;
use presentation::graphql;

pub async fn main() -> Result<()> {
	let web_server = http_server(http_port()?);

	let mut handles = vec![tokio::spawn(web_server)];
	handles.extend(spawn_listeners().await?);
	try_join_all(handles).await?;

	Ok(())
}

fn http_port() -> Result<u16> {
	let port = std::env::var("PORT").unwrap_or(8081.to_string()).parse()?;
	Ok(port)
}

pub async fn http_server(port: u16) {
	let state = warp::any().map(move || graphql::Context::new());
	let graphql_filter = juniper_warp::make_graphql_filter(graphql::create_schema(), state.boxed());

	warp::serve(
		warp::get()
			.and(warp::path("graphiql"))
			.and(juniper_warp::graphiql_filter("/graphql", None))
			.or(warp::path("graphql").and(graphql_filter)),
	)
	.run(([0, 0, 0, 0], port))
	.await
}

async fn spawn_listeners() -> Result<Vec<JoinHandle<()>>> {
	let database = Arc::new(database::Client::new(init_pool()?));
	let github = Arc::new(github::Client::new());
	let reqwest_client = reqwest::Client::new();

	let handles = [
		Logger.spawn(event_bus::consumer("logger").await?),
		ContributorWithGithubDataProjector::new(github, database.clone())
			.spawn(event_bus::consumer("github-contributor-projector").await?),
		ProjectLeadProjector::new(database.clone())
			.spawn(event_bus::consumer("project-lead-projector").await?),
		EventWebHook::new(reqwest_client).spawn(event_bus::consumer("event-webhooks").await?),
	];

	Ok(handles.into())
}

trait Spawnable {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()>;
}

impl<EL: EventListener + 'static> Spawnable for EL {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()> {
		let listener = Arc::new(self);
		tokio::spawn(async move {
			bus.subscribe(|event: Event| notify_event_listener(listener.clone(), event))
				.await
				.expect("Failed while trying to project received event");
		})
	}
}

async fn notify_event_listener(
	listener: Arc<dyn EventListener>,
	event: Event,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(&event).await;
	Ok(())
}
