use rocket::{
	http::Status,
	outcome::Outcome,
	request::{self, FromRequest},
	Request,
};

use crate::http::Config;

#[derive(Debug)]
pub enum ApiKeyError {
	BadCount,
	Missing,
	Invalid,
}

pub struct ApiKey;

#[rocket::async_trait]
impl<'r> FromRequest<'r> for ApiKey {
	type Error = ApiKeyError;

	async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
		let keys: Vec<_> = request.headers().get("Api-Key").collect();

		if let Some(allowed_keys) =
			request.rocket().state::<Config>().map(|config| config.api_keys().clone())
		{
			match keys.len() {
				0 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Missing)),
				1 if allowed_keys.contains(&keys[0].to_string()) => Outcome::Success(ApiKey),
				1 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Invalid)),
				_ => Outcome::Failure((Status::Unauthorized, ApiKeyError::BadCount)),
			}
		} else {
			Outcome::Failure((Status::InternalServerError, ApiKeyError::Missing))
		}
	}
}
