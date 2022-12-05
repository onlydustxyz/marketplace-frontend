use self::client::GraphQLClient;
use crate::config;
use reqwest::header::{HeaderMap, HeaderValue};

mod client;
mod repositories;

fn graphql_config() -> config::Hasura {
	config::load().expect("Unable to load configuration").hasura
}

pub struct HasuraClient(GraphQLClient);

impl HasuraClient {
	fn new(url: &str, hasura_secret: &str) -> Self {
		let mut custom_headers = HeaderMap::new();
		custom_headers.insert(
			"x-hasura-admin-secret",
			HeaderValue::from_str(hasura_secret).expect("invalid value for hasura secret"),
		);
		HasuraClient(GraphQLClient::new(url, custom_headers))
	}
}

impl Default for HasuraClient {
	fn default() -> Self {
		Self::new(
			graphql_config().graphql_server_url.as_str(),
			graphql_config().graphql_admin_secret.as_str(),
		)
	}
}
