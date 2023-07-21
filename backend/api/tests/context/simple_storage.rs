use std::env;

use anyhow::{anyhow, Result};
use api::infrastructure::simple_storage;
use testcontainers::{clients::Cli, images::generic::GenericImage, Container, RunnableImage};

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub(super) config: simple_storage::Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli) -> Result<Self> {
		let container = docker.run(image());
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;

		let config = simple_storage::Config {
			images_bucket_name: "onlydust-app-images".to_string(),
			bucket_region: "eu-west-1".to_string(),
			endpoint: Some(format!("http://localhost:{port}")),
			access_key_id: "access_key_id".to_string(),
			secret_access_key: "secret_access_key".to_string(),
		};

		Ok(Self {
			_container: container,
			config,
		})
	}
}

fn image() -> RunnableImage<GenericImage> {
	RunnableImage::from(
		GenericImage::new("wiremock/wiremock", "latest"), /* .with_volume("wiremock",
		                                                   * "/home/wiremock")
		                                                   * .with_entrypoint(
		                                                   * 	"--proxy-all=\"https://s3.eu-west-1.amazonaws.com\" --record-mappings --verbose",
		                                                   * ), */
	)
}
