use anyhow::{anyhow, Result};
use graphql_client::{GraphQLQuery, Response};
use olog::error;
use url::Url;

use super::Config;

pub struct Client {
	client: reqwest::Client,
	url: Url,
}

impl Client {
	pub fn new(config: &Config) -> Result<Self> {
		Ok(Self {
			client: reqwest::Client::builder().default_headers(config.build_headers()?).build()?,
			url: config.base_url().clone(),
		})
	}

	pub async fn query<Q: GraphQLQuery>(&self, variables: Q::Variables) -> Result<Q::ResponseData> {
		let body = Q::build_query(variables);
		let response: Response<Q::ResponseData> =
			self.client.post(self.url.clone()).json(&body).send().await?.json().await?;

		if let Some(errors) = response.errors {
			return Err(anyhow!(
				errors
					.into_iter()
					.map(|error| {
						error!(error = error.to_string(), "GraphQL error");
						error
					})
					.map(|e| e.to_string())
					.collect::<Vec<_>>()
					.join(", ")
			));
		}

		response.data.ok_or_else(|| anyhow!("No data received"))
	}
}
