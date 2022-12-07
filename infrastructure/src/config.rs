use anyhow::Result;
use figment::{
	providers::{Format, Yaml},
	Figment,
};
use serde::Deserialize;
use std::path::Path;

pub fn load<'a, T: Deserialize<'a>, P: AsRef<Path>>(path: P) -> Result<T> {
	let config = Figment::from(Yaml::file(path)).extract()?;
	Ok(config)
}

#[cfg(test)]
mod tests {
	use super::*;

	#[derive(Deserialize)]
	pub struct App {
		pub api_key: String,
	}

	#[test]
	fn config_from_file() {
		figment::Jail::expect_with(|jail| {
			jail.create_file(
				"app.yaml",
				r#"
                api_key: my_api_key
                "#,
			)?;

			let result = load("app.yaml");
			assert!(result.is_ok(), "{}", result.err().unwrap());

			let config: App = result.unwrap();
			assert_eq!(config.api_key, "my_api_key");

			Ok(())
		});
	}
}
