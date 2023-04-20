use std::collections::HashMap;

use anyhow::Result;
use derive_getters::Getters;
use derive_more::Constructor;
use domain::LogErr;
use reqwest::header::HeaderMap;
use serde::Deserialize;
use url::Url;

#[derive(Deserialize, Getters, Constructor)]
pub struct Config {
	base_url: Url,
	#[serde(default)]
	headers: HashMap<String, String>,
}

impl Config {
	pub fn build_headers(&self) -> Result<HeaderMap> {
		let headers = self
			.headers
			.iter()
			.filter_map(|(header, value)| {
				let value =
					value.parse().log_err(&format!("Invalid value for header {header}")).ok();
				let header = header.parse().log_err(&format!("Invalid header {header}")).ok();

				match (header, value) {
					(Some(header), Some(value)) => Some((header, value)),
					_ => None,
				}
			})
			.collect();

		Ok(headers)
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn build_headers_from_config() {
		let config = Config::new(
			"http://api.github.com".parse().unwrap(),
			vec![("x-hasura-admin-secret".to_string(), "test".to_string())]
				.into_iter()
				.collect(),
		);

		let headers = config.build_headers().expect("Unable to build headers");
		assert_eq!(headers.get("x-hasura-admin-secret").unwrap(), "test");
		assert!(headers.get("unexisting").is_none());
	}
}
