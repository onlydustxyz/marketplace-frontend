use std::marker::PhantomData;

use rocket::{
	/// Rocket's http module for handling HTTP requests and responses.
	http::Status,
	/// Outcome type used to indicate success or failure of a request guard.
	outcome::Outcome,
	/// Rocket's request module for handling HTTP requests.
	request::{self, FromRequest},
	Request,
};

use crate::http::Config;

/// A guard that requires a valid API key to access a route.
#[derive(Default)]
pub struct Guard<K: ApiKey> {
	/// A marker field to ensure that the generic type K is used.
	phantom: PhantomData<K>,
}

/// Error types that can occur when checking for a valid API key.
#[derive(Debug)]
pub enum ApiKeyError {
	/// A request contained an invalid number of API keys.
	BadCount,
	/// A request did not contain a required API key.
	Missing,
	/// A request contained an invalid API key.
	Invalid,
}

/// A trait defining the properties of an API key.
pub trait ApiKey: Default {
	/// The name of the API key.
	fn name() -> &'static str;
}

#[rocket::async_trait]
impl<'r, K: ApiKey> FromRequest<'r> for Guard<K> {
	type Error = ApiKeyError;

	/// Attempts to retrieve a valid API key from the request headers.
	async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
		let keys: Vec<_> = request.headers().get("Api-Key").collect();

		if let Some(api_key) = request
			.rocket()
			.state::<Config>()
			.and_then(|config| config.api_keys().get(K::name()))
		{
			match keys.len() {
				0 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Missing)),
				1 if keys[0] == api_key => Outcome::Success(Guard::default()),
				1 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Invalid)),
				_ => Outcome::Failure((Status::Unauthorized, ApiKeyError::BadCount)),
			}
		} else {
			Outcome::Forward(())
		}
	}
}