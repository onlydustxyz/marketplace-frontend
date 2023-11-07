use anyhow::{anyhow, Result};
use infrastructure::http;
use testcontainers::{clients::Cli, images::generic::GenericImage, Container, RunnableImage};

use super::API_KEY;

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub config: http::Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli, wiremock_path: String) -> Result<Self> {
		let container = docker.run(image(wiremock_path));
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;

		let config = http::Config {
			base_url: format!("http://localhost:{port}/new-indexer"),
			headers: std::iter::once(("Api-Key".to_string(), API_KEY.to_string())).collect(),
		};

		Ok(Self {
			_container: container,
			config,
		})
	}
}

fn image(wiremock_path: String) -> RunnableImage<GenericImage> {
	/* To record traffic, use the following command and change the port to 8080 in the config.base_url above
	   docker run \
	   -p 8080:8080 \
	   -v $PWD/common/testing/resources/wiremock/github:/home/wiremock \
	   wiremock/wiremock \
	   --proxy-all="https://api.github.com" \
	   --record-mappings --verbose
	*/

	RunnableImage::from(
		GenericImage::new("wiremock/wiremock", "latest")
			.with_volume(wiremock_path, "/home/wiremock")
			.with_wait_for(testcontainers::core::WaitFor::StdOutMessage {
				message: String::from("verbose:"),
			}),
	)
}
