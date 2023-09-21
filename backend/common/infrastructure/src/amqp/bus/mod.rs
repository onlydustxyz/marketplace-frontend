use std::sync::{Arc, Weak};

use domain::Message;
use lapin::{
	message::Delivery,
	options::{BasicCancelOptions, ExchangeDeclareOptions, QueueDeclareOptions},
	publisher_confirm::Confirmation,
	BasicProperties, Channel, Connection, Consumer,
};
use olog::{error, IntoField};
use thiserror::Error;
use tokio::sync::{Mutex, RwLock};
use tokio_retry::{strategy::FixedInterval, Retry};
use tokio_stream::StreamExt;

use super::{Config, UniqueMessage};

mod destination;
mod publisher;
mod subscriber;
pub use destination::Destination;

const DELIVERY_MODE_PERSISTENT: u8 = 2;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Amqp(#[from] lapin::Error),
	#[error(transparent)]
	Serde(#[from] serde_json::Error),
}

pub struct Bus {
	_connection: Arc<Connection>,
	channel: Channel,
}

impl Bus {
	/// Initalizes a new event bus by connecting to RabbitMQ and creating a new channel of
	/// communication.
	///
	/// If it fails to connect to RabbitMQ, it will retry at fixed interval depending on the
	/// configuration.
	///
	/// In case the connection to RabbitMQ is lost later during the execution of the
	/// application, an error will be logged and the process will exit with code 1.
	///
	/// The combination of those two behaviors allows us to let Heroku restart the application as
	/// soon as the connection is lost, while ensuring it doesn't crash again when it restarts (in
	/// case RabbitMQ is still not reachable). Not doing the retry would potentially lead the
	/// application to restart early again, and would make us enter the exponential backoff policy
	/// of Heroku (the second restart can be delayed by up to 20 minutes (!!!) by Heroku).
	pub async fn new(config: Config) -> Result<Self, Error> {
		let connection = connect(config).await?;
		Ok(Self {
			channel: connection.create_channel().await?,
			_connection: connection,
		})
	}

	pub fn as_publisher(self, destination: Destination) -> PublisherBus {
		PublisherBus {
			bus: self,
			destination,
		}
	}

	pub async fn with_queue(
		self,
		queue_name: String,
		options: QueueDeclareOptions,
	) -> Result<ConsumableBus, Error> {
		self.channel.queue_declare(&queue_name, options, Default::default()).await?;
		ConsumableBus::new(self, queue_name).await
	}

	pub async fn publish<M: Message>(
		&self,
		exchange_name: &str,
		routing_key: &str,
		message: UniqueMessage<M>,
	) -> Result<Confirmation, Error> {
		let confirmation = self
			.channel
			.basic_publish(
				exchange_name,
				routing_key,
				Default::default(),
				&serde_json::to_vec(&message)?,
				BasicProperties::default().with_delivery_mode(DELIVERY_MODE_PERSISTENT),
			)
			.await?
			.await?;

		Ok(confirmation)
	}
}

pub struct ConsumableBus {
	bus: Bus,
	queue_name: String,
	consumer: RwLock<Consumer>,
}

impl ConsumableBus {
	async fn new(bus: Bus, queue_name: String) -> Result<Self, Error> {
		let prefetch_count =
			std::env::var("AMQP_PREFETCH_COUNT").unwrap_or_default().parse().unwrap_or(100);
		bus.channel.basic_qos(prefetch_count, Default::default()).await?;

		let consumer = bus
			.channel
			.basic_consume(
				&queue_name,
				"consumer",
				Default::default(),
				Default::default(),
			)
			.await?;

		Ok(Self {
			bus,
			queue_name,
			consumer: RwLock::new(consumer),
		})
	}

	pub fn queue_name(&self) -> &str {
		&self.queue_name
	}

	pub async fn cancel_consumer(&self) -> Result<(), Error> {
		self.bus.channel.basic_cancel("consumer", BasicCancelOptions::default()).await?;
		Ok(())
	}

	pub async fn with_exchange<E: AsRef<str>>(self, exchange_name: E) -> Result<Self, Error> {
		self.bus
			.channel
			.exchange_declare(
				exchange_name.as_ref(),
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
				&self.queue_name,
				exchange_name.as_ref(),
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

pub struct PublisherBus {
	bus: Bus,
	destination: Destination,
}

lazy_static! {
	static ref CONNECTION: Mutex<Option<Weak<Connection>>> = Mutex::new(None);
}

/// Retrives the open connection or connect if called for the first time
async fn connect(config: Config) -> Result<Arc<Connection>, Error> {
	let mut guard = CONNECTION.lock().await;
	match guard.as_ref().and_then(Weak::upgrade) {
		Some(connection) => Ok(connection),
		None => {
			let connection = Arc::new(_do_connect(config).await?);
			*guard = Some(Arc::downgrade(&connection));
			Ok(connection)
		},
	}
}

/// This function actually connects to RabbitMQ and must be called only once
async fn _do_connect(config: Config) -> Result<Connection, Error> {
	let retry_strategy = FixedInterval::from_millis(config.connection_retry_interval_ms)
		.take(config.connection_retry_count);

	let connection = Retry::spawn(retry_strategy, || async {
		Connection::connect(&config.url, Default::default()).await.map_err(|error| {
			error!(
				error = error.to_field(),
				"Failed to connect to RabbitMQ. Retrying in {}ms for a maximum of {} attempts.",
				config.connection_retry_interval_ms,
				config.connection_retry_count
			);
			error
		})
	})
	.await?;
	connection.on_error(|error| {
		error!(error = error.to_field(), "Lost connection to RabbitMQ");
		std::process::exit(1);
	});

	Ok(connection)
}
