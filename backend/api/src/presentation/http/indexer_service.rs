use std::sync::Arc;

use anyhow::{anyhow, Error};
use infrastructure::http;
use reqwest::header::{HeaderMap, HeaderValue};
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{domain::services::indexer, Config};

pub struct IndexerService(pub Arc<dyn indexer::Service>);

#[async_trait]
impl<'r> FromRequest<'r> for IndexerService {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<IndexerService, Self::Error> {
		let config = match request.rocket().state::<Config>() {
			Some(config) => config,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing configuration"),
				)),
		};

		let headers: HeaderMap = request
			.headers()
			.get(reqwest::header::AUTHORIZATION.as_str())
			.map(|value| {
				(
					reqwest::header::AUTHORIZATION,
					HeaderValue::from_str(value).unwrap(),
				)
			})
			.collect();

		let http_client = match http::Client::new(config.indexer_client.clone(), headers) {
			Ok(client) => client,
			Err(e) => return Outcome::Failure((Status::InternalServerError, e)),
		};

		Outcome::Success(Self(Arc::new(http_client)))
	}
}
