use infrastructure::amqp::{Bus, Config};
use rstest::fixture;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, RunnableImage,
};

pub struct Context<'docker> {
	pub consumer: Bus,
	pub publisher: Bus,
	_container: Container<'docker, GenericImage>,
}

#[fixture]
#[once]
pub fn docker() -> Cli {
	Cli::docker()
}

fn image() -> RunnableImage<GenericImage> {
	RunnableImage::from(GenericImage::new("rabbitmq", "3.11").with_wait_for(
		WaitFor::StdOutMessage {
			message: "Server startup complete".to_string(),
		},
	))
}

impl<'docker> Context<'docker> {
	pub async fn new(docker: &'static Cli) -> Context<'static> {
		let container = docker.run(image());

		let port = container.ports().map_to_host_port_ipv4(5672).expect("Invalid AMQP port");

		let config = Config {
			url: format!("amqp://127.0.0.1:{}/%2f", port),
			connection_retry_interval_ms: 100,
			connection_retry_count: 6000,
		};

		Context {
			consumer: Bus::new(config.clone()).await.unwrap(),
			publisher: Bus::new(config).await.unwrap(),
			_container: container,
		}
	}
}
