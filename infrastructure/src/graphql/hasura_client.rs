use reqwest::header::{HeaderMap, HeaderValue};

use super::GraphQLClient;

fn graphql_url() -> String {
	std::env::var("HASURA_GRAPHQL_GRAPHQL_URL").expect("HASURA_GRAPHQL_GRAPHQL_URL must be set")
}

fn hasura_secret() -> String {
	std::env::var("HASURA_GRAPHQL_ADMIN_SECRET").expect("HASURA_GRAPHQL_ADMIN_SECRET must be set")
}

pub fn new() -> GraphQLClient {
	let mut custom_headers = HeaderMap::new();
	custom_headers.insert(
		"x-hasura-admin-secret",
		HeaderValue::from_str(hasura_secret().as_str())
			.expect("HASURA_GRAPHQL_ADMIN_SECRET has an invalid value"),
	);
	GraphQLClient {
		http_client: reqwest::Client::new(),
		url: graphql_url(),
		custom_headers,
	}
}
