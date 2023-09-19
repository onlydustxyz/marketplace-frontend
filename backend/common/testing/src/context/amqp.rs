use std::{collections::HashMap, sync::Arc};

use anyhow::{anyhow, Result};
use domain::{Destination, Event, Publisher, Subscriber, SubscriberCallbackError};
use infrastructure::amqp::{self, Bus, BusError, ConsumableBus, UniqueMessage};
use lapin::options::QueueDeclareOptions;
use serde_json::Value;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};
use tokio::sync::mpsc::{self, UnboundedReceiver, UnboundedSender};
use tokio_async_drop::tokio_async_drop;

pub struct Context<'docker> {
	pub config: amqp::Config,
	pub listeners: HashMap<String, UnboundedReceiver<Value>>,
	kill_channels: Vec<UnboundedSender<()>>,
	publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	_container: Container<'docker, GenericImage>,
}

impl<'docker> Context<'docker> {
	pub async fn new(
		docker: &'docker Cli,
		queues_to_listen: Vec<&str>,
		exchanges_to_listen: Vec<&str>,
	) -> Result<Context<'docker>> {
		let container = docker.run(image());

		let port = container
			.ports()
			.map_to_host_port_ipv4(5672)
			.ok_or(anyhow!("Invalid AMQP port"))?;

		let config = amqp::Config {
			url: format!("amqp://127.0.0.1:{}/%2f", port),
			connection_retry_interval_ms: 100,
			connection_retry_count: 6000,
		};

		let mut listeners: HashMap<String, UnboundedReceiver<Value>> = HashMap::new();
		let mut kill_channels: Vec<UnboundedSender<()>> = Vec::new();

		for queue in queues_to_listen {
			let bus = Arc::new(create_consumer(queue.to_string(), config.clone()).await?);
			let (tx, rx) = mpsc::unbounded_channel();
			let (kill_tx, kill_rx) = mpsc::unbounded_channel();

			spawn_subscriber(bus.clone(), tx);
			spawn_subscriber_killer(bus, kill_rx);

			listeners.insert(queue.to_string(), rx);
			kill_channels.push(kill_tx);
		}

		for exchange in exchanges_to_listen {
			let bus = Arc::new(
				create_consumer(format!("queue_{exchange}"), config.clone())
					.await?
					.with_exchange(exchange)
					.await?,
			);
			let (tx, rx) = mpsc::unbounded_channel();
			let (kill_tx, kill_rx) = mpsc::unbounded_channel();

			spawn_subscriber(bus.clone(), tx);
			spawn_subscriber_killer(bus, kill_rx);

			listeners.insert(exchange.to_string(), rx);
			kill_channels.push(kill_tx);
		}

		Ok(Self {
			_container: container,
			config: config.clone(),
			listeners,
			publisher: Arc::new(Bus::new(config).await?),
			kill_channels,
		})
	}

	pub async fn listen<R>(&mut self, queue_or_exchange: &str) -> Option<R>
	where
		R: for<'de> serde::de::Deserialize<'de>,
	{
		self.listeners
			.get_mut(queue_or_exchange)
			.unwrap()
			.recv()
			.await
			.map(|value| serde_json::from_value(value).expect("Unable to deserialize message"))
	}

	pub async fn publish<E: Into<Event>>(&self, destination: Destination, event: E) -> Result<()> {
		self.publisher.publish(destination, &UniqueMessage::new(event.into())).await?;
		Ok(())
	}
}

impl<'docker> Drop for Context<'docker> {
	fn drop(&mut self) {
		self.kill_channels
			.iter()
			.for_each(|kill| kill.send(()).expect("Unable to shutdown listener"));

		self.listeners.iter_mut().for_each(|(_, receiver)| {
			tokio_async_drop!({
				receiver.recv().await;
			})
		});
	}
}

fn spawn_subscriber_killer(bus: Arc<ConsumableBus>, mut kill: UnboundedReceiver<()>) {
	tokio::spawn(async move {
		if kill.recv().await.is_some() {
			bus.cancel_consumer().await.expect("Unable to cancel consumer");
		}
	});
}

fn spawn_subscriber(bus: Arc<ConsumableBus>, tx: UnboundedSender<Value>) {
	tokio::spawn(async move {
		bus.subscribe(|message| on_event(message, tx.clone()))
			.await
			.expect("Error in subscribe")
	});
}

async fn on_event(
	message: amqp::UniqueMessage<Value>,
	tx: UnboundedSender<Value>,
) -> std::result::Result<(), SubscriberCallbackError> {
	tx.send(message.payload().clone())
		.map_err(|e| SubscriberCallbackError::Fatal(anyhow!(e)))
}

fn image() -> RunnableImage<GenericImage> {
	RunnableImage::from(GenericImage::new("rabbitmq", "3.11").with_wait_for(
		WaitFor::StdOutMessage {
			message: "Server startup complete".to_string(),
		},
	))
}

pub async fn create_consumer(
	queue_name: String,
	config: amqp::Config,
) -> Result<ConsumableBus, BusError> {
	let event_bus = Bus::new(config)
		.await?
		.with_queue(
			queue_name.clone(),
			QueueDeclareOptions {
				// allows multiple connections to this queue, and do not delete the queue when
				// connection is closed
				exclusive: false,

				// the queue will survive a broker restart
				durable: true,

				// do not delete the queue when the last consumer unsubscribes
				auto_delete: false,
				..Default::default()
			},
		)
		.await?;
	Ok(event_bus)
}
