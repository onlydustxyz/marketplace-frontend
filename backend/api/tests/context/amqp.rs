use anyhow::{anyhow, Result};
use domain::{Event, Subscriber, SubscriberCallbackError, SubscriberError};
use infrastructure::amqp;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};
use tokio::sync::mpsc::{self, UnboundedReceiver, UnboundedSender};

pub struct Context<'docker> {
	pub(super) config: amqp::Config,
	pub listener: UnboundedReceiver<Event>,
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

		let bus = event_store::bus::consumer(config.clone()).await?;
		let (tx, rx) = mpsc::unbounded_channel();
		tokio::spawn(async move {
			bus.subscribe(|message| on_event(message, tx.clone()))
				.await
				.expect("Error in subscribe");
		});

		Ok(Self {
			_container: container,
			config,
			listener: rx,
		})
	}
}

impl<'docker> Drop for Context<'docker> {
	fn drop(&mut self) {
		self.handle.abort();
	}
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
