use anyhow::Result;
use figment::{
	providers::{Format, Yaml},
	Figment,
};
use serde::Deserialize;
use std::path::Path;

mod providers;
use providers::Enhanced;

pub fn load<'a, T: Deserialize<'a>, P: AsRef<Path>>(path: P) -> Result<T> {
	let config = Figment::from(Enhanced::new(Yaml::file(path))).extract()?;
	Ok(config)
}

#[cfg(test)]
mod tests {
	use super::*;

	#[derive(Deserialize)]
	pub struct App {
		api_key: String,
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
                api_key: my_api_key
                inner:
                  key: another_key
                  multiple:
                    - val1
                    - val2
                "#,
			)?;

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
                api_key: $MY_API_KEY
                inner:
                  key: $MY_API_KEY
                  multiple:
                    - val1
                    - $MY_API_KEY
                    - $NON_EXISTING_KEY
                "#,
			)?;

			jail.set_env("MY_API_KEY", "my_api_key");

			let result = load("app.yaml");
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config: App = result.unwrap();
			assert_eq!(config.api_key, "my_api_key");
			assert_eq!(config.inner.key, "my_api_key");
			assert_eq!(
				config.inner.multiple,
				vec!["val1", "my_api_key", "$NON_EXISTING_KEY"]
			);

			Ok(())
		});
	}
}
