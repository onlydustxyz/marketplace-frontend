use std::collections::HashMap;

use api::{
	infrastructure::simple_storage,
	presentation::{bootstrap::bootstrap, http},
	Config,
};
use derive_more::From;
use rocket::local::asynchronous::Client;
use rstest::fixture;
use testcontainers::{clients::Cli, images::generic::GenericImage};

pub mod amqp;
pub mod database;
pub mod event_listener;

use amqp::container as amqp_container;
use database::container as database_container;
use url::Url;

#[fixture]
#[once]
fn docker() -> Cli {
	Cli::docker()
}

#[derive(Debug, From)]
pub struct Container(testcontainers::Container<'static, GenericImage>);

pub struct Setup {
	pub config: Config,
	pub client: Client,
	_database_container: Container,
	_amqp_container: Container,
}

#[fixture]
pub async fn setup(database_container: Container, amqp_container: Container) -> Setup {
	tracing_subscriber::fmt::init();

	let config = Config {
		amqp: amqp::config(
			amqp_container.0.ports().map_to_host_port_ipv4(5672).expect("Invalid AMQP port"),
		),
		http: http::Config {
			api_keys: HashMap::new(),
		},
		database: database::config(
			database_container
				.0
				.ports()
				.map_to_host_port_ipv4(5432)
				.expect("Invalid postgres port"),
		),
		tracer: infrastructure::tracing::Config {
			ansi: false,
			json: true,
			location: true,
		},
		web3: infrastructure::web3::Config {
			url: "https://test.com".parse().unwrap(),
		},
		s3: simple_storage::Config {
			images_bucket_name: "".to_string(),
			bucket_region: "eu-west-1".to_string(),
			access_key_id: "access_key_id_test".to_string(),
			secret_access_key: "secret_access_key_test".to_string(),
		},
		graphql_client: infrastructure::graphql::Config {
			base_url: Url::parse(&("https://test.com".to_string())).unwrap(),
			headers: HashMap::new(),
		},
		github: infrastructure::github::Config {
			base_url: "http://github-test.com".to_string(),
			personal_access_tokens: "test".to_string(),
			headers: HashMap::new(),
			max_calls_per_request: None,
		},
	};

	let rocket_builder = bootstrap(config.clone()).await.expect("Invalid rocket build");
	let client = Client::tracked(rocket_builder).await.expect("Invalid rocket instance");

	Setup {
		config,
		client,
		_database_container: database_container,
		_amqp_container: amqp_container,
	}
}
