#[cfg(test)]
mod tests {
	use std::{env, thread, time};
	use std::collections::HashMap;
	use std::time::Duration;

	use rocket::{get, Shutdown};
	use rocket::http::Status;
	use rocket::local::asynchronous::Client;
	use rocket::routes;
	use rstest::fixture;
	use testcontainers::{Container, RunnableImage};
	use testcontainers::clients::Cli;
	use testcontainers::core::{Port, WaitFor};
	use testcontainers::images::generic::GenericImage;
	use testcontainers::images::rabbitmq::RabbitMq;
	use url::Url;

	use api::Config;
	use api::infrastructure::simple_storage;
	use api::presentation::bootstrap::bootstrap;
	use infrastructure::{amqp, database, github, graphql, tracing, web3};
	use infrastructure::tracing::Tracer;
	use presentation::http;
	use presentation::http::config::rocket;

	#[tokio::test]
	pub async fn should_create_project() {
		// Given
		let postgres_db = "marketplace_db".to_string();
		let postgres_user = "postgres".to_string();
		let postgres_password = "Passw0rd".to_string();
		let postgres_image = build_postgres_image(&postgres_db, &postgres_user, &postgres_password);

		let docker_client = Cli::docker();

		let postgres_container = docker_client.run(postgres_image);
		let postgres_port = postgres_container.ports().map_to_host_port_ipv4(5432).unwrap();

		let database_url = format!(
			"postgres://{}:{}@{}:{}/{}",
			&postgres_user,
			&postgres_password,
			"localhost".to_string(),
			&postgres_port,
			&postgres_db
		);
		let database_url = format!(
			"postgres://{}:{}@{}:{}/{}",
			&postgres_user,
			&postgres_password,
			"localhost".to_string(),
			32812,
			&postgres_db
		);
		let database_config = database::Config {
			url: database_url,
			pool_max_size: 2,
		};

		let rabbit_mq_image = RunnableImage::from(
			GenericImage::new("rabbitmq", "3.11-management")
				.with_wait_for(
					WaitFor::StdOutMessage {
						message: "Server startup complete".to_string(),
					}
				)
		)
			.with_mapped_port(Port { local: 5672, internal: 5672 })
			.with_mapped_port(Port { local: 15672, internal: 15672 });

		let rabbit_mq_container = docker_client.run(rabbit_mq_image);
		let rabbit_mq_url = format!("amqp://127.0.0.1:{}/%2f", 5672);
		let amqp_config = amqp::Config { url: rabbit_mq_url, connection_retry_count: 100, connection_retry_interval_ms: 6000 };

		let tracer_config = tracing::Config { ansi: false, json: true, location: true };
		let web3_config = web3::Config { url: "https://test.com".parse().unwrap() };
		let s3_config = simple_storage::Config {
			images_bucket_name: "".to_string(),
			bucket_region: "eu-west-1".to_string(),
			access_key_id: "access_key_id_test".to_string(),
			secret_access_key: "secret_access_key_test".to_string(),
		};
		let graphql_config = graphql::Config { base_url: Url::parse(&("https://test.com".to_string())).unwrap(), headers: HashMap::new() };
		let github_config = github::Config {
			base_url: "http://github-test.com".to_string(),
			personal_access_tokens: "test".to_string(),
			headers: HashMap::new(),
			max_calls_per_request: None,
		};
		let config: Config = Config {
			http: http::Config { api_keys: HashMap::new() },
			database: database_config,
			amqp: amqp_config,
			tracer: tracer_config,
			github: github_config,
			web3: web3_config,
			s3: s3_config,
			graphql_client: graphql_config,
		};
		let rocket_builder = bootstrap(config).await.unwrap();

		let client = Client::tracked(rocket_builder).await.expect("valid rocket instance");

		// When
		let response = client.get("/health")
			.dispatch();

		// Then
		assert_eq!(response.await.status(), Status::Ok);
	}

	fn build_postgres_image(postgres_db: &String, postgres_user: &String, postgres_password: &String) -> GenericImage {
		let hasura_auth_migrations_path = format!(
			"{}/tests/resources/hasura_auth_migrations",
			env::current_dir().unwrap().into_os_string().into_string().unwrap()
		);
		GenericImage::new("postgres", "14.3-alpine")
			.with_env_var("POSTGRES_DB".to_string(), &postgres_db.to_string())
			.with_env_var("POSTGRES_USER".to_string(), &postgres_user.to_string())
			.with_env_var("POSTGRES_PASSWORD".to_string(), &postgres_password.to_string())
			.with_env_var("POSTGRES_HOST_AUTH_METHOD".to_string(), "trust".to_string())
			.with_volume(hasura_auth_migrations_path.to_string(),
						 "/docker-entrypoint-initdb.d".to_string())
			.with_wait_for(WaitFor::StdOutMessage {
				message: "database system is ready to accept connections".to_string(),
			})
	}
}
