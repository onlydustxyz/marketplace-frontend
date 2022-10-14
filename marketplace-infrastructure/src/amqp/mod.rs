pub mod event_bus;
mod publisher;
mod subscriber;

use lapin::{
	message::Delivery, options::QueueDeclareOptions, publisher_confirm::Confirmation, Channel,
	Connection,
};
use log::error;
use std::env::VarError;
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
	queue_name: &'static str,
}

impl EventBus {
	pub async fn new(connection: Connection) -> Result<Self, Error> {
		let channel = connection.create_channel().await?;

		Ok(Self {
			_connection: connection,
			channel,
			exchange_name: "",
			queue_name: "",
		})
	}

	pub async fn with_exchange(self, exchange_name: &'static str) -> Result<Self, Error> {
		self.channel
			.exchange_declare(
				exchange_name,
				lapin::ExchangeKind::Fanout,
				Default::default(),
				Default::default(),
			)
			.await?;

		Ok(Self {
			exchange_name,
			..self
		})
	}

	pub async fn with_queue(
		self,
		queue_name: &'static str,
		options: QueueDeclareOptions,
	) -> Result<Self, Error> {
		self.channel.queue_declare("", options, Default::default()).await?;

		Ok(Self { queue_name, ..self })
	}

	pub async fn binded(self) -> Result<Self, Error> {
		self.channel
			.queue_bind(
				self.queue_name,
				self.exchange_name,
				"",
				Default::default(),
				Default::default(),
			)
			.await?;

		Ok(self)
	}

	async fn consume(&self) -> Result<Option<Delivery>, Error> {
		let mut consumer = self
			.channel
			.basic_consume(self.queue_name, "", Default::default(), Default::default())
			.await?;

		match consumer.next().await {
			Some(Ok(delivery)) => Ok(Some(delivery)),
			Some(Err(error)) => Err(error.into()),
			None => Ok(None),
		}
	}

	async fn publish(&self, data: &[u8]) -> Result<Confirmation, Error> {
		let confirmation = self
			.channel
			.basic_publish(
				self.exchange_name,
				"",
				Default::default(),
				data,
				Default::default(),
			)
			.await?
			.await?;

		Ok(confirmation)
	}
}
