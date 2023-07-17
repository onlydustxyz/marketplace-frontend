#[cfg(test)]
mod tests {
	use std::collections::HashMap;
	use std::env;

	use rocket::http::{ContentType, Status};
	use rocket::local::asynchronous::Client;
	use rocket::serde::json::json;
	use testcontainers::clients::Cli;
	use testcontainers::core::WaitFor;
	use testcontainers::images::generic::GenericImage;
	use testcontainers::RunnableImage;
	use url::Url;

	use api::Config;
	use api::infrastructure::simple_storage;
	use api::presentation::bootstrap::bootstrap;
	use infrastructure::{amqp, database, github, graphql, web3};
	use presentation::http;

	#[tokio::test]
	pub async fn it() {
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

		let rabbit_mq_image = build_rabbit_mq_image();
		let rabbit_mq_container = docker_client.run(rabbit_mq_image);
		let rabbit_mq_port = rabbit_mq_container.ports().map_to_host_port_ipv4(5672).unwrap();
		let rabbit_mq_url = format!("amqp://127.0.0.1:{}/%2f", rabbit_mq_port);

		should_create_project(build_bootstrap_config(
			amqp::Config { url: rabbit_mq_url.to_string(), connection_retry_count: 100, connection_retry_interval_ms: 6000 },
			database::Config {
				url: database_url.clone(),
				pool_max_size: 2,
			})).await;

		println!("Stopping postgres container");
		postgres_container.stop();
		println!("Stopping rabbitmq container");
		rabbit_mq_container.stop();
		println!("IT tear down");
	}

	pub async fn should_create_project(config: Config) {
		let rocket_builder = bootstrap(config)
			.await.unwrap();
		let client = Client::tracked(rocket_builder).await.expect("valid rocket instance");

		let create_project_request = json!({
						"name": "name-test",
			"short_description": "short-description-name",
			"long_description": "long-description-name",
			"telegram_link": "http://telegram-link.test",
			"logo_url": "http://logo-url.test"
		});
		// When
		let response = client.post("/api/projects")
			.header(ContentType::JSON)
			.body(create_project_request.to_string())
			.dispatch();
		// Then
		let local_response = response.await;
		assert_eq!(local_response.status(), Status::Ok);
		println!("{:?}", &local_response.body());
	}


	fn build_bootstrap_config(amqp_config: amqp::Config, database_config: database::Config) -> Config {
		let tracer_config = infrastructure::tracing::Config { ansi: false, json: true, location: true };
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
		Config {
			http: http::Config { api_keys: HashMap::new() },
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
			GenericImage::new("rabbitmq", "3.11-management")
				.with_wait_for(
					WaitFor::StdOutMessage {
						message: "Server startup complete".to_string(),
					}
				)
		)
	}


	fn build_postgres_image(postgres_db: &String, postgres_user: &String, postgres_password: &String) -> RunnableImage<GenericImage> {
		let hasura_auth_migrations_path = format!(
			"{}/tests/resources/hasura_auth_migrations",
			env::current_dir().unwrap().into_os_string().into_string().unwrap()
		);
		RunnableImage::from(
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
		)
	}
}
