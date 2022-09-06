use okapi::openapi3::{Object, SecurityRequirement, SecurityScheme, SecuritySchemeData};
use rocket::{
	http::Status,
	outcome::Outcome,
	request::{self, FromRequest},
	Request,
};
use rocket_okapi::{
	gen::OpenApiGenerator,
	request::{OpenApiFromRequest, RequestHeaderInput},
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

impl<'r> OpenApiFromRequest<'r> for ApiKey {
	fn from_request_input(
		_gen: &mut OpenApiGenerator,
		_name: String,
		_required: bool,
	) -> rocket_okapi::Result<RequestHeaderInput> {
		// Setup global requirement for Security scheme
		let security_scheme = SecurityScheme {
			description: Some("Requires an API key to access.".to_owned()),
			// Setup data requirements.
			// In this case the header `Authorization: Api-Key` needs to be set.
			data: SecuritySchemeData::ApiKey {
				name: "Api-Key".to_owned(),
				location: "header".to_owned(),
			},
			extensions: Object::default(),
		};
		// Add the requirement for this route/endpoint
		// This can change between routes.
		let mut security_req = SecurityRequirement::new();
		// Each security requirement needs to be met before access is allowed.
		security_req.insert("ApiKeyAuth".to_owned(), Vec::new());
		// These vvvvvvv-----^^^^^^^^ values need to match exactly!
		Ok(RequestHeaderInput::Security(
			"ApiKeyAuth".to_owned(),
			security_scheme,
			security_req,
		))
	}

	fn get_responses(
		_gen: &mut OpenApiGenerator,
	) -> rocket_okapi::Result<okapi::openapi3::Responses> {
		Ok(okapi::openapi3::Responses::default())
	}
}
