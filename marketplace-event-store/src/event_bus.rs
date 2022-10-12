use crate::Event;
use anyhow::anyhow;
use async_trait::async_trait;
use lapin::{options::QueueDeclareOptions, Channel, Connection};
use log::{error, info};
use marketplace_domain::{Bus, Publisher, PublisherError, Subscriber, SubscriberError};
use std::{env::VarError, future::Future};
use thiserror::Error;
use tokio_stream::StreamExt;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Environment(#[from] VarError),
	#[error(transparent)]
	AMQP(#[from] lapin::Error),
}

pub struct EventBus {
	_connection: Connection,
	channel: Channel,
	queue_name: &'static str,
}

impl EventBus {
	pub async fn new(connection: Connection, queue_name: &'static str) -> Result<Self, Error> {
		let channel = connection.create_channel().await?;

		Ok(Self {
			_connection: connection,
			channel,
			queue_name,
		})
	}

	pub async fn default() -> Result<Self, Error> {
		let connection = Connection::connect(&amqp_address()?, Default::default()).await?;
		info!("🔗 Event store connected");
		Self::new(connection, "event-store").await
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
				self.queue_name,
				QueueDeclareOptions {
					durable: true,      // persist messages during restart
					exclusive: true,    // only one consumer on this queue
					auto_delete: false, // do not delete the queue at shutdown
					..Default::default()
				},
				Default::default(),
			)
			.await
			.map_err(|e| {
				error!("Failed while declaring the queue: {e}");
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
				error!("Failed while consuming event: {e}");
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
				"",
				self.queue_name,
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

fn amqp_address() -> Result<String, Error> {
	let address = std::env::var("AMQP_ADDR")?;
	Ok(address)
}
