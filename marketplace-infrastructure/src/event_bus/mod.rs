use anyhow::anyhow;
use async_trait::async_trait;
use lapin::{options::QueueDeclareOptions, Channel, Connection};
use log::{error, info};
use marketplace_domain::{Bus, Event, Publisher, PublisherError, Subscriber, SubscriberError};
use std::{env::VarError, future::Future};
use thiserror::Error;
use tokio_stream::StreamExt;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Environment(#[from] VarError),
	#[error(transparent)]
	Amqp(#[from] lapin::Error),
}

pub struct EventBus {
	_connection: Connection,
	channel: Channel,
	exchange_name: &'static str,
}

impl EventBus {
	pub async fn new(connection: Connection, exchange_name: &'static str) -> Result<Self, Error> {
		let channel = connection.create_channel().await?;

		channel
			.exchange_declare(
				exchange_name,
				lapin::ExchangeKind::Fanout,
				Default::default(),
				Default::default(),
			)
			.await?;

		Ok(Self {
			_connection: connection,
			channel,
			exchange_name,
		})
	}

	pub async fn default() -> Result<Self, Error> {
		let connection = Connection::connect(&amqp_address()?, Default::default()).await?;
		info!("🔗 Event bus connected");
		Self::new(connection, "events").await
	}
}

#[async_trait]
impl Subscriber<Event> for EventBus {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), SubscriberError>
	where
		C: Fn(Event) -> F + Send + Sync,
		F: Future<Output = Result<(), anyhow::Error>> + Send,
	{
		let queue = self
			.channel
			.queue_declare(
				"",
				QueueDeclareOptions {
					exclusive: true, // only one consumer on this queue
					..Default::default()
				},
				Default::default(),
			)
			.await
			.map_err(|e| {
				error!("Failed while declaring queue {e}");
				SubscriberError::Infrastructure(anyhow!(e))
			})?;

		self.channel
			.queue_bind(
				queue.name().as_str(),
				self.exchange_name,
				"",
				Default::default(),
				Default::default(),
			)
			.await
			.map_err(|e| {
				error!("Failed while binding queue to exchange {e}");
				SubscriberError::Infrastructure(anyhow!(e))
			})?;

		let mut consumer = self
			.channel
			.basic_consume(
				queue.name().as_str(),
				"",
				Default::default(),
				Default::default(),
			)
			.await
			.map_err(|e| {
				error!("Failed while consuming event {e}");
				SubscriberError::Infrastructure(anyhow!(e))
			})?;

		while let Some(delivery) = consumer.next().await {
			let delivery = delivery.map_err(|e| {
				error!("Failed while dequeuing new event: {e}");
				SubscriberError::Infrastructure(anyhow!(e))
			})?;

			let event: Event = serde_json::from_slice(&delivery.data)?;
			match callback(event).await {
				Ok(_) => delivery.ack(Default::default()).await.map_err(|e| {
					error!("Failed while acknowledging event: {e}");
					SubscriberError::Infrastructure(anyhow!(e))
				})?,

				Err(error) => {
					error!("{error}");
					delivery.nack(Default::default()).await.map_err(|e| {
						error!("Failed while sending negative ack to publisher: {e}");
						SubscriberError::Infrastructure(anyhow!(e))
					})?;

					return Err(SubscriberError::Processing(error));
				},
			}
		}

		Ok(())
	}
}

#[async_trait]
impl Publisher<Event> for EventBus {
	async fn publish(&self, event: Event) -> Result<(), PublisherError> {
		let confirmation = self
			.channel
			.basic_publish(
				self.exchange_name,
				topic(&event),
				Default::default(),
				&serde_json::to_vec(&event)?,
				Default::default(),
			)
			.await
			.map_err(|e| {
				error!("Failed while publishing event");
				PublisherError::Infrastructure(anyhow!(e))
			})?
			.await
			.map_err(|e| {
				error!("Failed while receiving confirmation of event publication");
				PublisherError::Infrastructure(anyhow!(e))
			})?;

		match confirmation.is_nack() {
			true => Err(PublisherError::Nack),
			false => Ok(()),
		}
	}
}

impl Bus<Event> for EventBus {}

fn topic(event: &Event) -> &'static str {
	match event {
		Event::Contribution(_) => "Contribution",
		Event::Contributor(_) => "Contributor",
		Event::Project(_) => "Project",
	}
}

fn amqp_address() -> Result<String, Error> {
	let address = std::env::var("AMQP_ADDR")?;
	Ok(address)
}
