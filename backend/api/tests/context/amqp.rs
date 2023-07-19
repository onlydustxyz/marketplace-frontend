use anyhow::{anyhow, Result};
use domain::{Event, Subscriber, SubscriberCallbackError, SubscriberError};
use infrastructure::amqp;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};
use tokio::{
	sync::mpsc::{self, Receiver, Sender},
	task::JoinHandle,
};

pub struct Context<'a> {
	pub(super) config: amqp::Config,
	handle: JoinHandle<Result<(), SubscriberError>>,
	pub listener: Receiver<Event>,
	_container: Container<'a, GenericImage>,
}

impl<'a> Context<'a> {
	pub async fn new(docker: &'a Cli) -> Result<Context<'a>> {
		let container = docker.run(RunnableImage::from(
			GenericImage::new("rabbitmq", "3.11").with_wait_for(WaitFor::StdOutMessage {
				message: "Server startup complete".to_string(),
			}),
		));

		let port = container
			.ports()
			.map_to_host_port_ipv4(5672)
			.ok_or(anyhow!("Invalid AMQP port"))?;

		let config = amqp::Config {
			url: format!("amqp://127.0.0.1:{}/%2f", port),
			connection_retry_interval_ms: 100,
			connection_retry_count: 6000,
		};

		let bus = event_store::bus::consumer(config.clone()).await?;
		let (tx, rx) = mpsc::channel(1024);

		Ok(Self {
			_container: container,
			config,
			handle: tokio::spawn(async move {
				bus.subscribe(|message| on_event(message, tx.clone())).await
			}),
			listener: rx,
		})
	}
}

impl<'a> Drop for Context<'a> {
	fn drop(&mut self) {
		self.handle.abort();
	}
}

async fn on_event(
	message: amqp::UniqueMessage<Event>,
	tx: Sender<Event>,
) -> std::result::Result<(), SubscriberCallbackError> {
	tx.send(message.payload().clone())
		.await
		.map_err(|e| SubscriberCallbackError::Fatal(anyhow!(e)))
}
