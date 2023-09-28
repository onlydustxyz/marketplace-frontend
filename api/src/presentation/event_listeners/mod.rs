pub mod logger;
pub mod quote_syncer;
pub mod webhook;

use std::{sync::Arc, time::Duration};

use anyhow::Result;
use domain::{currencies, EventListener, LogErr, Message, Subscriber, SubscriberCallbackError};
use futures::future::try_join_all;
use infrastructure::{amqp::UniqueMessage, coinmarketcap, database, event_bus};
use olog::{error, IntoField};
use tokio::task::JoinHandle;
use tokio_cron_scheduler::Job;
use tokio_retry::{strategy::FixedInterval, Retry};
use url::{ParseError, Url};
use webhook::EventWebHook;

use self::logger::Logger;
use crate::Config;

pub async fn bootstrap(config: Config) -> Result<Job> {
	Ok(Job::new_one_shot_async(
		Duration::ZERO,
		move |_id, _lock| {
			let cloned_config = config.clone();
			Box::pin(async move {
				Retry::spawn(FixedInterval::from_millis(5000), || async {
					_bootstrap(cloned_config.clone()).await.log_err(|e| {
						error!(error = e.to_field(), "Error in event listeners bootstrap")
					})
				})
				.await
				.unwrap()
			})
		},
	)?)
}

pub async fn _bootstrap(config: Config) -> Result<()> {
	info!("Bootstrapping event listeners");
	let reqwest = reqwest::Client::new();
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database.clone(),
	)?));
	let coinmarketcap = Arc::new(coinmarketcap::Client::new(
		config.coinmarketcap.clone(),
		currencies::USD,
	));

	let listeners = spawn_all(config.clone(), reqwest, database, coinmarketcap).await?;
	try_join_all(listeners).await?;
	Ok(())
}

pub async fn spawn_all(
	config: Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
	coinmarketcap: Arc<coinmarketcap::Client>,
) -> Result<Vec<JoinHandle<()>>> {
	let mut handles = vec![
		Logger.spawn(event_bus::event_consumer(config.amqp.clone(), "logger").await?),
		quote_syncer::Projector::new(database.clone(), coinmarketcap)
			.spawn(event_bus::event_consumer(config.amqp.clone(), "quote_sync").await?),
	];

	for (index, target) in webhook_targets().into_iter().enumerate() {
		handles.push(
			EventWebHook::new(reqwest.clone(), target).spawn(
				event_bus::event_consumer(config.amqp.clone(), format!("event-webhooks-{index}"))
					.await?,
			),
		)
	}

	Ok(handles)
}

pub trait Spawnable<E: Message + Send + Sync, S: Subscriber<UniqueMessage<E>> + Send + Sync> {
	fn spawn(self, bus: S) -> JoinHandle<()>;
}

impl<
	E: Message + Send + Sync,
	S: Subscriber<UniqueMessage<E>> + Send + Sync + 'static,
	EL: EventListener<E> + 'static,
> Spawnable<E, S> for EL
{
	fn spawn(self, bus: S) -> JoinHandle<()> {
		let listener = Arc::new(self);
		tokio::spawn(async move {
			bus.subscribe(|message: UniqueMessage<E>| {
				notify_event_listener(listener.clone(), message.payload().clone())
			})
			.await
			.expect("Failed while trying to project received event");
		})
	}
}

async fn notify_event_listener<E>(
	listener: Arc<dyn EventListener<E>>,
	event: E,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(event).await.map_err(SubscriberCallbackError::from)
}

fn webhook_targets() -> Vec<Url> {
	std::env::var("EVENT_WEBHOOK_TARGET")
		.map(|targets| {
			targets
				.split(',')
				.filter_map(|target| {
					target
						.parse()
						.log_err(|e: &ParseError| {
							olog::error!(error = e.to_field(), "Invalid webhook target URL")
						})
						.ok()
				})
				.collect()
		})
		.unwrap_or_default()
}
