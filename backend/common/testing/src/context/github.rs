use std::num::NonZeroUsize;

use anyhow::{anyhow, Result};
use infrastructure::github;
use testcontainers::{clients::Cli, images::generic::GenericImage, Container, RunnableImage};

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub config: github::Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli, wiremock_path: String, github_pat: String) -> Result<Self> {
		let container = docker.run(image(wiremock_path));
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;

		let config = github::Config {
			base_url: format!("http://localhost:{port}"),
			personal_access_tokens: github_pat,
			headers: Default::default(),
			max_calls_per_request: NonZeroUsize::new(1).map(Into::into),
		};

		Ok(Self {
			_container: container,
			config,
		})
	}

	pub async fn print_wiremock_scenarios(&self) {
		let body = reqwest::get(format!("{}/__admin/scenarios", self.config.base_url))
			.await
			.expect("Failed to get wiremock scenarios")
			.text()
			.await
			.expect("Failed to read wiremock scenarios");

		println!("Wiremock scenarios = {body}");
	}
}

fn image(wiremock_path: String) -> RunnableImage<GenericImage> {
	/* To record traffic, use the following command and change the port to 8080 in the config.base_url above
	   docker run \
	   -p 8080:8080 \
	   -v $PWD/backend/common/testing/resources/wiremock/github:/home/wiremock \
	   wiremock/wiremock \
	   --proxy-all="https://api.github.com" \
	   --record-mappings --verbose
	*/

	RunnableImage::from(
		GenericImage::new("wiremock/wiremock", "3.0.0-1")
			.with_volume(wiremock_path, "/home/wiremock")
			.with_wait_for(testcontainers::core::WaitFor::StdOutMessage {
				message: String::from("verbose:"),
			}),
	)
}
