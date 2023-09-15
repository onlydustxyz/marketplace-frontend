use std::sync::Arc;

use anyhow::Error;
use infrastructure::http;
use rocket::{
	http::Status,
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{
	application::payment::request::Usecase, presentation::http::usecases::FromRocketState, Config,
};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let config = try_outcome!(Config::from_state(request.rocket()));

		let headers = request
			.headers()
			.get(reqwest::header::AUTHORIZATION.as_str())
			.map(|value| (reqwest::header::AUTHORIZATION, value.parse().unwrap()))
			.collect();

		let http_client = match http::Client::new(config.indexer_client.clone(), headers) {
			Ok(client) => client,
			Err(e) => return Outcome::Failure((Status::InternalServerError, e)),
		};

		Outcome::Success(Self::new(
			try_outcome!(FromRocketState::from_state(request.rocket())),
			try_outcome!(FromRocketState::from_state(request.rocket())),
			try_outcome!(FromRocketState::from_state(request.rocket())),
			Arc::new(http_client),
		))
	}
}
