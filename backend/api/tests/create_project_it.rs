mod fixtures;

use std::collections::HashMap;

use api::{infrastructure::simple_storage, presentation::bootstrap::bootstrap, Config};
use fixtures::database::{config as db_config, container as db_container};
use infrastructure::{amqp, database, github, graphql, web3};
use olog::info;
use presentation::http;
use rocket::{
	http::{ContentType, Status},
	local::asynchronous::Client,
	serde::json::json,
};
use rstest::rstest;
use testcontainers::{
	clients::Cli, core::WaitFor, images::generic::GenericImage, Container, Image, RunnableImage,
};
use url::Url;

#[rstest]
#[tokio::test]
pub async fn it(db_container: Container<'static, impl Image>, db_config: database::Config) {
	tracing_subscriber::fmt::init();

	// Given
	let docker_client: Cli = Cli::docker();

	let rabbit_mq_image = build_rabbit_mq_image();
	let rabbit_mq_container = docker_client.run(rabbit_mq_image);
	let rabbit_mq_port = rabbit_mq_container.ports().map_to_host_port_ipv4(5672).unwrap();
	let rabbit_mq_url = format!("amqp://127.0.0.1:{}/%2f", rabbit_mq_port);

	should_create_project(build_bootstrap_config(
		amqp::Config {
			url: rabbit_mq_url.to_string(),
			connection_retry_count: 100,
			connection_retry_interval_ms: 6000,
		},
		db_config,
	))
	.await;

	info!("Stopping postgres container");
	db_container.stop();
	info!("Stopping rabbitmq container");
	rabbit_mq_container.stop();
	info!("IT tear down");
}

pub async fn should_create_project(config: Config) {
	let rocket_builder = bootstrap(config).await.expect("valid rocket build");
	let client = Client::tracked(rocket_builder).await.expect("valid rocket instance");

	let create_project_request = json!({
		"name": "name-test",
		"short_description": "short-description-name",
		"long_description": "long-description-name",
		"telegram_link": "http://telegram-link.test",
	});

	// When
	let response = client
		.post("/api/projects")
		.header(ContentType::JSON)
		.body(create_project_request.to_string())
		.dispatch();

	// Then
	let local_response = response.await;
	assert_eq!(local_response.status(), Status::Ok);
}

fn build_bootstrap_config(amqp_config: amqp::Config, database_config: database::Config) -> Config {
	let tracer_config = infrastructure::tracing::Config {
		ansi: false,
		json: true,
		location: true,
	};
	let web3_config = web3::Config {
		url: "https://test.com".parse().unwrap(),
	};
	let s3_config = simple_storage::Config {
		images_bucket_name: "".to_string(),
		bucket_region: "eu-west-1".to_string(),
		access_key_id: "access_key_id_test".to_string(),
		secret_access_key: "secret_access_key_test".to_string(),
	};
	let graphql_config = graphql::Config {
		base_url: Url::parse(&("https://test.com".to_string())).unwrap(),
		headers: HashMap::new(),
	};
	let github_config = github::Config {
		base_url: "http://github-test.com".to_string(),
		personal_access_tokens: "test".to_string(),
		headers: HashMap::new(),
		max_calls_per_request: None,
	};
	Config {
		http: http::Config {
			api_keys: HashMap::new(),
		},
		database: database_config,
		amqp: amqp_config,
		tracer: tracer_config,
		github: github_config,
		web3: web3_config,
		s3: s3_config,
		graphql_client: graphql_config,
	}
}

fn build_rabbit_mq_image() -> RunnableImage<GenericImage> {
	RunnableImage::from(
		GenericImage::new("rabbitmq", "3.11-management").with_wait_for(WaitFor::StdOutMessage {
			message: "Server startup complete".to_string(),
		}),
	)
}
