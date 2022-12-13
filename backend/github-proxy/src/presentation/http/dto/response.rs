use anyhow::Result;
use olog::error;
use reqwest::header::HeaderMap;
use rocket::{
	http::{hyper::body::Bytes, Status},
	response::{Responder, Response as RocketResponse, Result as ResponseResult},
	Request,
};
use std::io::Cursor;

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
		Ok(Self {
			status: response.status().as_u16(),
			headers: response.headers().clone(),
			body: response.bytes().await?,
		})
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
