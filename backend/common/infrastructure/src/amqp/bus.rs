use super::Config;
use lapin::{
	message::Delivery,
	options::{ExchangeDeclareOptions, QueueDeclareOptions},
	publisher_confirm::Confirmation,
	BasicProperties, Channel, Connection, Consumer,
};
use log::error;
use thiserror::Error;
use tokio::sync::RwLock;
use tokio_stream::StreamExt;

const DELIVERY_MODE_PERSISTENT: u8 = 2;

#[derive(Debug, Error)]
pub enum Error {
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

	pub async fn default(config: &Config) -> Result<Self, Error> {
		let connection = Connection::connect(config.url(), Default::default()).await?;
		Self::new(connection).await
	}

	pub async fn with_queue(
		self,
		queue_name: &'static str,
		options: QueueDeclareOptions,
	) -> Result<ConsumableBus, Error> {
		self.channel.queue_declare(queue_name, options, Default::default()).await?;
		ConsumableBus::new(self, queue_name).await
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
				BasicProperties::default().with_delivery_mode(DELIVERY_MODE_PERSISTENT),
			)
			.await?
			.await?;

		Ok(confirmation)
	}
}

pub struct ConsumableBus {
	bus: Bus,
	queue_name: &'static str,
	consumer: RwLock<Consumer>,
}

impl ConsumableBus {
	async fn new(bus: Bus, queue_name: &'static str) -> Result<Self, Error> {
		let consumer = bus
			.channel
			.basic_consume(queue_name, "", Default::default(), Default::default())
			.await?;

		Ok(Self {
			bus,
			queue_name,
			consumer: RwLock::new(consumer),
		})
	}

	pub async fn with_exchange(self, exchange_name: &'static str) -> Result<Self, Error> {
		self.bus
			.channel
			.exchange_declare(
				exchange_name,
				lapin::ExchangeKind::Fanout,
				ExchangeDeclareOptions {
					durable: true,
					..Default::default()
				},
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
		match self.consumer.write().await.next().await {
			Some(Ok(delivery)) => Ok(Some(delivery)),
			Some(Err(error)) => Err(error.into()),
			None => Ok(None),
		}
	}
}
