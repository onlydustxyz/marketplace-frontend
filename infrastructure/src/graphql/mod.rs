use reqwest::header::{HeaderMap, HeaderValue};

use self::client::GraphQLClient;

mod client;
mod config;
mod repositories;

pub use config::Config;

pub struct HasuraClient(GraphQLClient);

impl HasuraClient {
	pub fn new(config: &Config) -> Self {
		let mut custom_headers = HeaderMap::new();
		custom_headers.insert(
			"x-hasura-admin-secret",
			HeaderValue::from_str(config.admin_secret()).expect("invalid value for hasura secret"),
		);
		HasuraClient(GraphQLClient::new(config.url(), custom_headers))
	}
}
