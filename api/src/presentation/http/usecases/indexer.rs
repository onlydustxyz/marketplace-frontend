use anyhow::Error;
use infrastructure::http;
use rocket::{
	http::Status,
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{presentation::http::usecases::FromRocketState, Config};

pub struct Client(pub http::Client);

#[async_trait]
impl<'r> FromRequest<'r> for Client {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Client, Self::Error> {
		let config = try_outcome!(Config::from_state(request.rocket()));

		let headers = request
			.headers()
			.get(reqwest::header::AUTHORIZATION.as_str())
			.map(|value| (reqwest::header::AUTHORIZATION, value.parse().unwrap()))
			.collect();

		let http_client = match http::Client::new(config.indexer_client, headers) {
			Ok(client) => client,
			Err(e) => return Outcome::Failure((Status::InternalServerError, e)),
		};

		Outcome::Success(Client(http_client))
	}
}
