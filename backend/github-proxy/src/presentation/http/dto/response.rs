use std::io::Cursor;

use anyhow::Result;
use infrastructure::github::DebugTechnicalHeaders;
use olog::error;
use reqwest::header::{HeaderMap, HeaderValue, CACHE_CONTROL};
use rocket::{
	http::{hyper::body::Bytes, Status},
	response::{Responder, Response as RocketResponse, Result as ResponseResult},
	Request,
};

pub struct Response {
	status: u16,
	headers: HeaderMap,
	body: Bytes,
}

impl<'r, 'o: 'r> Responder<'r, 'o> for Response {
	fn respond_to(self, _request: &'r Request<'_>) -> ResponseResult<'o> {
		Ok(RocketResponse::build()
			.status(Status::from_code(self.status).ok_or_else(|| {
				error!(
					status = self.status,
					"Invalid status code received from github"
				);
				Status::InternalServerError
			})?)
			.sized_body(self.body.len(), Cursor::new(self.body))
			.headers(self.headers)
			.map_err(|e| {
				error!(
					error = e.to_string(),
					"Unable to decode header received from github"
				);
				Status::InternalServerError
			})?
			.finalize())
	}
}

impl Response {
	pub async fn from_reqwest_response(response: reqwest::Response) -> Result<Self> {
		response.debug_technical_headers("Received response from Github API");
		let headers = Self::override_cache_control(response.headers().clone())?;

		Ok(Self {
			status: response.status().as_u16(),
			headers,
			body: response.bytes().await?,
		})
	}

	fn override_cache_control(mut headers: HeaderMap) -> Result<HeaderMap> {
		if headers.contains_key(CACHE_CONTROL) {
			let cache_control = headers
				.entry(CACHE_CONTROL)
				.or_insert(HeaderValue::from_static("public, max-age=60, s-maxage=60"));

			*cache_control = HeaderValue::from_str(
				cache_control.to_str()?.replace("private", "public").as_str(),
			)?;
		}

		Ok(headers)
	}
}

trait WithHeaders {
	fn headers(&mut self, headers: HeaderMap) -> Result<&mut Self>;
}

impl WithHeaders for rocket::response::Builder<'_> {
	fn headers(&mut self, headers: HeaderMap) -> anyhow::Result<&mut Self> {
		for key in headers.keys() {
			for value in headers.get_all(key) {
				self.raw_header(key.to_string(), value.to_str()?.to_owned());
			}
		}
		Ok(self)
	}
}

#[cfg(test)]
mod tests {
	use reqwest::header::{CACHE_CONTROL, HOST};
	use rstest::rstest;

	use super::*;

	#[rstest]
	fn override_cache_control_private() {
		let mut headers = HeaderMap::new();

		headers.insert(HOST, "example.com".parse().unwrap());
		headers.insert(
			CACHE_CONTROL,
			"private, max-age=60, s-maxage=60".parse().unwrap(),
		);

		let headers = Response::override_cache_control(headers).unwrap();
		assert_eq!(headers.get(HOST).unwrap(), &"example.com");
		assert_eq!(
			headers.get(CACHE_CONTROL).unwrap(),
			&"public, max-age=60, s-maxage=60"
		);
	}

	#[rstest]
	fn override_cache_control_public() {
		let mut headers = HeaderMap::new();

		headers.insert(HOST, "example.com".parse().unwrap());
		headers.insert(
			CACHE_CONTROL,
			"public, max-age=60, s-maxage=60".parse().unwrap(),
		);

		let headers = Response::override_cache_control(headers).unwrap();
		assert_eq!(headers.get(HOST).unwrap(), &"example.com");
		assert_eq!(
			headers.get(CACHE_CONTROL).unwrap(),
			&"public, max-age=60, s-maxage=60"
		);
	}

	#[rstest]
	fn override_cache_control_none() {
		let mut headers = HeaderMap::new();

		headers.insert(HOST, "example.com".parse().unwrap());

		let headers = Response::override_cache_control(headers).unwrap();
		assert_eq!(headers.get(HOST).unwrap(), &"example.com");
		assert!(!headers.contains_key(CACHE_CONTROL));
	}
}
