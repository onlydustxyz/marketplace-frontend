use rocket::{
	http::Status,
	outcome::Outcome,
	request::{self, FromRequest},
	Request,
};
#[derive(Default)]
pub struct ApiKey(String);

fn is_valid_key(key: &str) -> bool {
	key == match std::env::var("API_KEY") {
		Ok(v) => v,
		Err(_) => return false,
	}
}

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
		match keys.len() {
			0 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Missing)),
			1 if is_valid_key(keys[0]) => Outcome::Success(ApiKey(keys[0].to_string())),
			1 => Outcome::Failure((Status::Unauthorized, ApiKeyError::Invalid)),
			_ => Outcome::Failure((Status::Unauthorized, ApiKeyError::BadCount)),
		}
	}
}
