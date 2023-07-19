use std::sync::Arc;

use lapin::{
	message::Delivery,
	options::{ExchangeDeclareOptions, QueueDeclareOptions},
	publisher_confirm::Confirmation,
	BasicProperties, Channel, Connection, ConnectionState, Consumer,
};
use olog::{debug, error, warn};
use thiserror::Error;
use tokio::sync::{Mutex, RwLock};
use tokio_retry::{strategy::FixedInterval, Retry};
use tokio_stream::StreamExt;

use super::Config;

const DELIVERY_MODE_PERSISTENT: u8 = 2;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Amqp(#[from] lapin::Error),
}

pub struct Bus {
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
		})
	}

	pub async fn with_queue(
		self,
		queue_name: String,
		options: QueueDeclareOptions,
	) -> Result<ConsumableBus, Error> {
		self.channel.queue_declare(&queue_name, options, Default::default()).await?;
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

impl Drop for Bus {
	fn drop(&mut self) {
		debug!("Dropping Bus instance");
		futures::executor::block_on(close_connection());
	}
}

pub struct ConsumableBus {
	bus: Bus,
	queue_name: String,
	consumer: RwLock<Consumer>,
}

impl ConsumableBus {
	async fn new(bus: Bus, queue_name: String) -> Result<Self, Error> {
		let consumer = bus
			.channel
			.basic_consume(&queue_name, "", Default::default(), Default::default())
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
				&self.queue_name,
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

lazy_static! {
	static ref CONNECTION: Mutex<Option<Arc<Connection>>> = Mutex::new(None);
}

async fn close_connection() {
	let guard = CONNECTION.lock().await;
	match guard.as_ref() {
		Some(connection) if connection.status().state() == ConnectionState::Connected => {
			debug!("Closing bus connection {connection:?}");
			connection.close(200, "Normal shutdown").await.unwrap();
		},
		_ => warn!("No connection found to close"),
	}
}

/// Retrives the open connection or connect if called for the first time
async fn connect(config: Config) -> Result<Arc<Connection>, Error> {
	let mut guard = CONNECTION.lock().await;
	match guard.as_ref() {
		Some(connection) => Ok(connection.clone()),
		None => {
			let connection = Arc::new(_do_connect(config).await?);
			*guard = Some(connection.clone());
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
				"Failed to connect to RabbitMQ: {error:?}. Retrying in {}ms for a maximum of {} attempts.",
				config.connection_retry_interval_ms, config.connection_retry_count
			);
			error
		})
	})
	.await?;
	connection.on_error(|error| {
		error!(error = error.to_string(), "Lost connection to RabbitMQ");
		std::process::exit(1);
	});

	Ok(connection)
}
