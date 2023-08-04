use std::collections::HashMap;
use std::env;

use anyhow::{anyhow, Result};
use testcontainers::{Container, RunnableImage};
use testcontainers::clients::Cli;
use testcontainers::images::generic::GenericImage;
use url::Url;

use infrastructure::graphql::Config;

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub(super) config: Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli) -> Result<Self> {
		let container = docker.run(image());
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;
		let config = Config {
			base_url: Url::parse(&format!("https://localhost:{port}")).unwrap(),
			headers: HashMap::new(),
		};
		Ok(Self {
			_container: container,
			config,
		})
	}
}

fn image() -> RunnableImage<GenericImage> {
	let wiremock_path = format!(
		"{}/tests/resources/wiremock/graphql",
		env::current_dir().unwrap().display()
	);

	RunnableImage::from(
		GenericImage::new("wiremock/wiremock", "latest")
			.with_volume(wiremock_path, "/home/wiremock")
			.with_wait_for(testcontainers::core::WaitFor::StdOutMessage {
				message: String::from("verbose:"),
			}),
	)
}
