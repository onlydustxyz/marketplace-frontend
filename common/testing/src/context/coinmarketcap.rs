use anyhow::{anyhow, Result};
use infrastructure::coinmarketcap;
use testcontainers::{clients::Cli, images::generic::GenericImage, Container, RunnableImage};

pub struct Context<'docker> {
	_container: Container<'docker, GenericImage>,
	pub config: coinmarketcap::Config,
}

impl<'docker> Context<'docker> {
	pub fn new(docker: &'docker Cli, wiremock_path: String) -> Result<Self> {
		let container = docker.run(image(wiremock_path));
		let port = container
			.ports()
			.map_to_host_port_ipv4(8080)
			.ok_or(anyhow!("Invalid wiremock port"))?;

		let config = coinmarketcap::Config {
			base_url: Some(format!("http://localhost:{port}/")),
			api_key: String::from("CMC-API-KEY"),
			currencies: [
				(String::from("ETH"), String::from("1027")),
				(String::from("OP"), String::from("11840")),
				(String::from("APT"), String::from("21794")),
			]
			.into_iter()
			.collect(),
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
	   -v $PWD/api/tests/resources/wiremock/coinmarketcap:/home/wiremock \
	   wiremock/wiremock \
	   --proxy-all="https://pro-api.coinmarketcap.com" \
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
