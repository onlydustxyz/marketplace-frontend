use crate::Event;
use lapin::{options::QueueDeclareOptions, Channel, Connection};
use log::{error, info};
use std::{env::VarError, future::Future};
use thiserror::Error;
use tokio_stream::StreamExt;

const QUEUE_NAME: &str = "event-store";

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Environment(#[from] VarError),
	#[error(transparent)]
	AMQP(#[from] lapin::Error),
	#[error(transparent)]
	Callback(#[from] anyhow::Error),
	#[error("Could not deliver message to event store")]
	Delivery,
	#[error("Failed while serializing event")]
	Serialize(#[from] serde_json::Error),
}

pub struct Bus {
	_connection: Connection,
	channel: Channel,
	queue_name: &'static str,
}

impl Bus {
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
		Self::new(connection, QUEUE_NAME).await
	}

	pub async fn consume<C, F>(&self, callback: C) -> Result<(), Error>
	where
		C: Fn(Vec<u8>) -> F,
		F: Future<Output = Result<(), anyhow::Error>>,
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
			.await?;

		let mut consumer = self
			.channel
			.basic_consume(
				queue.name().as_str(),
				"",
				Default::default(),
				Default::default(),
			)
			.await?;

		while let Some(delivery) = consumer.next().await {
			let delivery = delivery?;
			match callback(delivery.data.clone()).await {
				Ok(()) => delivery.ack(Default::default()).await?,
				Err(error) => {
					error!("{error}");
					delivery.nack(Default::default()).await?;
					return Err(Error::Callback(error));
				},
			}
		}

		Ok(())
	}

	pub async fn publish(&self, event: Event) -> Result<(), Error> {
		let confirmation = self
			.channel
			.basic_publish(
				"",
				self.queue_name,
				Default::default(),
				&serde_json::to_vec(&event)?,
				Default::default(),
			)
			.await?
			.await?;

		if confirmation.is_nack() {
			// TODO retry mechanism
			return Err(Error::Delivery);
		}

		Ok(())
	}
}

fn amqp_address() -> Result<String, Error> {
	let address = std::env::var("AMQP_ADDR")?;
	Ok(address)
}
