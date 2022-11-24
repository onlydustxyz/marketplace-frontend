use anyhow::anyhow;
use graphql_client::GraphQLQuery;

pub mod hasura_client;
mod repositories;

pub struct GraphQLClient {
	http_client: reqwest::Client,
	url: String,
	custom_headers: reqwest::header::HeaderMap,
}

impl GraphQLClient {
	pub fn new(url: String, custom_headers: reqwest::header::HeaderMap) -> Self {
		GraphQLClient {
			http_client: reqwest::Client::new(),
			url,
			custom_headers,
		}
	}

	async fn query<Q: GraphQLQuery>(
		&self,
		variables: Q::Variables,
	) -> anyhow::Result<Q::ResponseData> {
		let response_body = self
			.post_graphql::<Q, _>(&self.http_client, self.url.clone(), variables)
			.await?;

		if let Some(errors) = response_body.errors {
			return Err(anyhow!("Errors in GraphQL response: {:?}", errors));
		}

		let response_data: Q::ResponseData =
			response_body.data.ok_or_else(|| anyhow!("missing response data"))?;
		Ok(response_data)
	}

	async fn post_graphql<Q: GraphQLQuery, U: reqwest::IntoUrl>(
		&self,
		client: &reqwest::Client,
		url: U,
		variables: Q::Variables,
	) -> Result<graphql_client::Response<Q::ResponseData>, reqwest::Error> {
		let body = Q::build_query(variables);
		let reqwest_response =
			client.post(url).headers(self.custom_headers.clone()).json(&body).send().await?;

		reqwest_response.json().await
	}
}
