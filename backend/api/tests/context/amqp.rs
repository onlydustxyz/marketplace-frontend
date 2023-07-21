use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{Event, Subscriber, SubscriberCallbackError};
use infrastructure::amqp::{self, ConsumableBus};
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};
use tokio::sync::mpsc::{self, UnboundedReceiver, UnboundedSender};
use tokio_async_drop::tokio_async_drop;

pub struct Context<'docker> {
	pub(super) config: amqp::Config,
	pub listener: UnboundedReceiver<Event>,
	kill: UnboundedSender<()>,
	_container: Container<'docker, GenericImage>,
}

impl<'docker> Context<'docker> {
	pub async fn new(docker: &'docker Cli) -> Result<Context<'docker>> {
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

		let bus = Arc::new(event_store::bus::consumer(config.clone()).await?);
		let (tx, rx) = mpsc::unbounded_channel();
		let (kill_tx, kill_rx) = mpsc::unbounded_channel();

		spawn_subscriber(bus.clone(), tx);
		spawn_subscriber_killer(bus, kill_rx);

		Ok(Self {
			_container: container,
			config,
			listener: rx,
			kill: kill_tx,
		})
	}
}

impl<'docker> Drop for Context<'docker> {
	fn drop(&mut self) {
		self.kill.send(()).expect("Unable to shutdown listener");
		tokio_async_drop!({
			self.listener.recv().await;
		})
	}
}

fn spawn_subscriber_killer(bus: Arc<ConsumableBus>, mut kill: UnboundedReceiver<()>) {
	tokio::spawn(async move {
		if kill.recv().await.is_some() {
			bus.cancel_consumer().await.expect("Unable to cancel consumer");
		}
	});
}

fn spawn_subscriber(bus: Arc<ConsumableBus>, tx: UnboundedSender<Event>) {
	tokio::spawn(async move {
		bus.subscribe(|message| on_event(message, tx.clone()))
			.await
			.expect("Error in subscribe")
	});
}

async fn on_event(
	message: amqp::UniqueMessage<Event>,
	tx: UnboundedSender<Event>,
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
