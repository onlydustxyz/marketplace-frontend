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

pub struct Bus {
	_connection: Connection,
	channel: Channel,
}

impl Bus {
	pub async fn new(connection: Connection) -> Result<Self, Error> {
		let channel = connection.create_channel().await?;

		Ok(Self {
			_connection: connection,
			channel,
		})
	}

	pub async fn default() -> Result<Self, Error> {
		let connection = Connection::connect(&amqp_address()?, Default::default()).await?;
		Self::new(connection).await
	}

	pub async fn with_queue(
		self,
		queue_name: &'static str,
		options: QueueDeclareOptions,
	) -> Result<ConsumableBus, Error> {
		self.channel.queue_declare(queue_name, options, Default::default()).await?;

		Ok(ConsumableBus {
			bus: self,
			queue_name,
		})
	}

	pub(super) async fn publish(
		&self,
		exchange_name: &str,
		routing_key: &str,
		data: &[u8],
	) -> Result<Confirmation, Error> {
		let confirmation = self
			.channel
			.basic_publish(
				exchange_name,
				routing_key,
				Default::default(),
				data,
				Default::default(),
			)
			.await?
			.await?;

		Ok(confirmation)
	}
}

pub struct ConsumableBus {
	bus: Bus,
	queue_name: &'static str,
}

impl ConsumableBus {
	pub async fn with_exchange(self, exchange_name: &'static str) -> Result<Self, Error> {
		self.bus
			.channel
			.exchange_declare(
				exchange_name,
				lapin::ExchangeKind::Fanout,
				Default::default(),
				Default::default(),
			)
			.await?;

		self.bus
			.channel
			.queue_bind(
				self.queue_name,
				exchange_name,
				"",
				Default::default(),
				Default::default(),
			)
			.await?;

		Ok(self)
	}

	pub(super) async fn consume(&self) -> Result<Option<Delivery>, Error> {
		let mut consumer = self
			.bus
			.channel
			.basic_consume(self.queue_name, "", Default::default(), Default::default())
			.await?;

		match consumer.next().await {
			Some(Ok(delivery)) => Ok(Some(delivery)),
			Some(Err(error)) => Err(error.into()),
			None => Ok(None),
		}
	}
}

fn amqp_address() -> Result<String, Error> {
	let address = std::env::var("AMQP_ADDR")?;
	Ok(address)
}
