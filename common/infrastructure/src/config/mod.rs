use std::path::Path;

use anyhow::{anyhow, Result};
use figment::{
	providers::{Format, Yaml},
	Figment,
};
use serde::Deserialize;

mod providers;
use providers::ExpandWithEnv;

pub fn load<'a, T: Deserialize<'a>, P: AsRef<Path>>(path: P) -> Result<T> {
	let config = Figment::new()
		.select(profile()?)
		.merge(ExpandWithEnv::new(Yaml::file(path).nested()))
		.extract()?;
	Ok(config)
}

fn profile() -> Result<String> {
	std::env::var("PROFILE").map_err(|_| anyhow!("Missing 'PROFILE' env variable"))
}

#[cfg(test)]
mod tests {
	use super::*;

	#[derive(Deserialize)]
	pub struct App {
		api_key: String,
		url: String,
		inner: Inner,
	}

	#[derive(Deserialize)]
	pub struct Inner {
		key: String,
		multiple: Vec<String>,
	}

	#[test]
	fn config_from_file() {
		figment::Jail::expect_with(|jail| {
			jail.create_file(
				"app.yaml",
				r#"
                local:
                  api_key: my_api_key
                  url: http://url.com
                  inner:
                    key: another_key
                    multiple:
                      - val1
                      - val2
                "#,
			)?;
			jail.set_env("PROFILE", "local");

			let result = load("app.yaml");
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config: App = result.unwrap();
			assert_eq!(config.api_key, "my_api_key");
			assert_eq!(config.inner.key, "another_key");
			assert_eq!(config.inner.multiple, vec!["val1", "val2"]);

			Ok(())
		});
	}

	#[test]
	fn config_from_env() {
		figment::Jail::expect_with(|jail| {
			jail.create_file(
				"app.yaml",
				r#"
                local:
                  url: http://url.com/$MY_API_KEY
                  api_key: $MY_API_KEY
                  inner:
                    key: $MY_API_KEY
                    multiple:
                      - val1
                      - $MY_API_KEY
                      - $NON_EXISTING_KEY
                "#,
			)?;
			jail.set_env("PROFILE", "local");

			jail.set_env("MY_API_KEY", "my_api_key");

			let result = load("app.yaml");
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config: App = result.unwrap();
			assert_eq!(config.api_key, "my_api_key");
			assert_eq!(config.url, "http://url.com/my_api_key");
			assert_eq!(config.inner.key, "my_api_key");
			assert_eq!(config.inner.multiple, vec!["val1", "my_api_key"]);

			Ok(())
		});
	}

	#[test]
	fn fail_if_missing_variable() {
		figment::Jail::expect_with(|jail| {
			jail.create_file(
				"app.yaml",
				r#"
                local:
                  url: http://url.com/$MY_API_KEY
                  api_key: $MY_API_KEY
                  inner:
                    key: $MY_API_KEY
                    multiple:
                      - val1
                "#,
			)?;
			jail.set_env("PROFILE", "local");

			let result = load::<App, _>("app.yaml");
			assert!(result.is_err());

			Ok(())
		});
	}
}
