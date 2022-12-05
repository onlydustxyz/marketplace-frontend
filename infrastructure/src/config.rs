use anyhow::Result;
use figment::{
	providers::{Env, Format, Toml},
	Figment,
};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct App {
	pub database: Database,
	pub amqp: Amqp,
	pub hasura: Hasura,
}

#[derive(Deserialize)]
pub struct Database {
	pub url: String,
}

#[derive(Deserialize)]
pub struct Amqp {
	pub url: String,
}

#[derive(Deserialize)]
pub struct Hasura {
	pub graphql_server_url: String,
	pub graphql_admin_secret: String,
}

pub fn load() -> Result<App> {
	let config = Figment::new().merge(Toml::file("App.toml")).merge(environment()).extract()?;
	Ok(config)
}

fn environment() -> Env {
	Env::raw().map(|key| match key.as_str() {
		"DATABASE_URL" => "database.url".into(),
		"HASURA_GRAPHQL_GRAPHQL_URL" => "hasura.graphql_server_url".into(),
		"HASURA_GRAPHQL_ADMIN_SECRET" => "hasura.graphql_admin_secret".into(),
		_ => key.into(),
	})
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn config_from_file() {
		figment::Jail::expect_with(|jail| {
			jail.create_file(
				"App.toml",
				r#"
				[database]
				url = "postgres://postgres:postgres@localhost/marketplace_db"
				[amqp]
				url = "amqp://127.0.0.1:5672/%2f"
				[hasura]
				graphql_server_url = "http://localhost:8080/v1/graphql"
				graphql_admin_secret = "myadminsecret"
				"#,
			)?;

			let result = load();
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config = result.unwrap();

			assert_eq!(
				config.database.url,
				"postgres://postgres:postgres@localhost/marketplace_db"
			);
			assert_eq!(config.amqp.url, "amqp://127.0.0.1:5672/%2f");
			assert_eq!(
				config.hasura.graphql_server_url,
				"http://localhost:8080/v1/graphql"
			);
			assert_eq!(config.hasura.graphql_admin_secret, "myadminsecret");

			Ok(())
		});
	}

	#[test]
	fn config_from_env() {
		figment::Jail::expect_with(|jail| {
			jail.set_env(
				"DATABASE_URL",
				"postgres://postgres:postgres@localhost/marketplace_db",
			);
			jail.set_env("amqp.url", "amqp://127.0.0.1:5672/%2f");
			jail.set_env(
				"HASURA_GRAPHQL_GRAPHQL_URL",
				"http://localhost:8080/v1/graphql",
			);
			jail.set_env("HASURA_GRAPHQL_ADMIN_SECRET", "myadminsecret");

			let result = load();
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config = result.unwrap();

			assert_eq!(
				config.database.url,
				"postgres://postgres:postgres@localhost/marketplace_db"
			);
			assert_eq!(config.amqp.url, "amqp://127.0.0.1:5672/%2f");
			assert_eq!(
				config.hasura.graphql_server_url,
				"http://localhost:8080/v1/graphql"
			);
			assert_eq!(config.hasura.graphql_admin_secret, "myadminsecret");

			Ok(())
		});
	}
}
