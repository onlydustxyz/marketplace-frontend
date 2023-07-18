use infrastructure::amqp::Config;
use rstest::fixture;
use testcontainers::{clients::Cli, core::WaitFor, images::generic::GenericImage, RunnableImage};

use super::{docker, Container};

#[fixture]
fn image() -> RunnableImage<GenericImage> {
	RunnableImage::from(
		GenericImage::new("rabbitmq", "3.11-management").with_wait_for(WaitFor::StdOutMessage {
			message: "Server startup complete".to_string(),
		}),
	)
}

#[fixture]
pub fn container(docker: &'static Cli, image: RunnableImage<GenericImage>) -> Container {
	docker.run(image).into()
}

pub fn config(port: u16) -> Config {
	Config {
		url: format!("amqp://127.0.0.1:{}/%2f", port),
		connection_retry_interval_ms: 100,
		connection_retry_count: 6000,
	}
}
