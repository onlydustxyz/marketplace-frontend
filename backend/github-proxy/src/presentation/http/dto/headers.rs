use anyhow::Result;
use derive_more::*;
use olog::error;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use rocket::{
	http::Status,
	outcome::IntoOutcome,
	request::{FromRequest, Outcome},
	Request,
};

#[derive(Debug, Into, From)]
pub struct Headers(HeaderMap);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Headers {
	type Error = anyhow::Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		try_decode_headers(request).into_outcome(Status::BadRequest)
	}
}

fn try_decode_headers(request: &Request<'_>) -> Result<Headers> {
	let mut headers = HeaderMap::new();

	const FORBIDDEN_HEADERS: [&str; 2] = [
		"host",    // added by Rocket
		"api-key", // do not leak secrets
	];

	for header in request
		.headers()
		.iter()
		.filter(|header| !FORBIDDEN_HEADERS.contains(&header.name().as_str()))
	{
		headers.append(
			header.name().as_str().parse::<HeaderName>().map_err(|error| {
				error!(
					error = error.to_string(),
					header = header.name().as_str(),
					"Unable to parse header name"
				);
				error
			})?,
			header.value().parse::<HeaderValue>().map_err(|error| {
				error!(
					error = error.to_string(),
					header = header.value(),
					"Unable to parse header value"
				);
				error
			})?,
		);
	}
	Ok(Headers(headers))
}
