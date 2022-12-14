use std::marker::PhantomData;

use rocket::{
	http::Status,
	outcome::Outcome,
	request::{self, FromRequest},
	Request,
};

use crate::http::Config;
#[derive(Default)]
pub struct Guard<K: ApiKey> {
	phantom: PhantomData<K>,
}

#[derive(Debug)]
pub enum ApiKeyError {
	BadCount,
	Missing,
	Invalid,
}

pub trait ApiKey: Default {
	fn name() -> &'static str;
}

#[rocket::async_trait]
impl<'r, K: ApiKey> FromRequest<'r> for Guard<K> {
	type Error = ApiKeyError;

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
