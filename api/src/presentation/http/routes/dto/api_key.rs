use rocket::{
	http::Status,
	outcome::Outcome,
	request::{self, FromRequest},
	Request,
};

use crate::presentation::http::Config;
#[derive(Default)]
pub struct ApiKey(String);

#[derive(Debug)]
pub enum ApiKeyError {
	BadCount,
	Missing,
	Invalid,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey {
	type Error = ApiKeyError;

	async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
		let keys: Vec<_> = request.headers().get("Api-Key").collect();

		if let Some(config) = request.rocket().state::<Config>() {
			match keys.len() {
				0 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Missing)),
				1 if keys[0] == config.api_key() => Outcome::Success(ApiKey(keys[0].to_string())),
				1 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Invalid)),
				_ => Outcome::Failure((Status::Unauthorized, ApiKeyError::BadCount)),
			}
		} else {
			Outcome::Forward(())
		}
	}
}
