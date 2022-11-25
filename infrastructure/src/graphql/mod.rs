use reqwest::header::{HeaderMap, HeaderValue};

use self::client::GraphQLClient;

mod client;
mod repositories;

fn graphql_url() -> String {
	std::env::var("HASURA_GRAPHQL_GRAPHQL_URL").expect("HASURA_GRAPHQL_GRAPHQL_URL must be set")
}

fn hasura_secret() -> String {
	std::env::var("HASURA_GRAPHQL_ADMIN_SECRET").expect("HASURA_GRAPHQL_ADMIN_SECRET must be set")
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
		Self::new(graphql_url().as_str(), hasura_secret().as_str())
	}
}
