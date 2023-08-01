use std::num::NonZeroUsize;

use anyhow::{anyhow, Result};
use infrastructure::github;
use testcontainers::{clients::Cli, images::generic::GenericImage, Container, RunnableImage};

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub config: github::Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli) -> Result<Self> {
		let container = docker.run(image());
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;

		let config = github::Config {
			base_url: format!("http://localhost:{port}"),
			personal_access_tokens: String::from("GITHUB_PAT"),
			headers: Default::default(),
			max_calls_per_request: NonZeroUsize::new(1).map(Into::into),
		};

		Ok(Self {
			_container: container,
			config,
		})
	}
}

fn image() -> RunnableImage<GenericImage> {
	let wiremock_path = format!(
		"{}/backend/common/testing/resources/wiremock/github",
		project_root::get_project_root().unwrap().display()
	);

	/* To record traffic, use the following command and change the port to 8080 in the config.base_url above
	   docker run \
	   -p 8080:8080 \
	   -v $PWD/backend/common/testing/resources/wiremock/github:/home/wiremock \
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
