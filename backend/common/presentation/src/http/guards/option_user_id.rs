use std::str::FromStr;

use async_trait::async_trait;
use domain::UserId;
use rocket::{
	http::{HeaderMap, Status},
	outcome::IntoOutcome,
	request::{FromRequest, Outcome},
	Request,
};
use thiserror::Error;

const HASURA_USER_ID_HEADER_KEY: &str = "x-hasura-user-id";

#[derive(Debug, Error, PartialEq, Eq)]
pub enum Error {
	#[error("{0} header is not present")]
	Missing(&'static str),
	#[error("{0} header is invalid")]
	Invalid(&'static str),
}

#[derive(Debug, PartialEq, Eq)]
pub struct OptionUserId {
	user_id: Option<UserId>,
}

impl OptionUserId {
	pub fn user_id(&self) -> Result<UserId, Error> {
		self.user_id.clone().ok_or(Error::Missing(HASURA_USER_ID_HEADER_KEY))
	}

	fn build<E: std::error::Error>(user_id: Result<Option<UserId>, E>) -> Result<Self, E> {
		Ok(Self { user_id: user_id? })
	}
}

impl OptionUserId {
	fn from_request_headers<'r>(
		headers: &HeaderMap<'r>,
	) -> Outcome<Self, <Self as FromRequest<'r>>::Error> {
		let user_id = headers.try_parse_header_as(HASURA_USER_ID_HEADER_KEY);

		OptionUserId::build(user_id).into_outcome(Status::BadRequest)
	}
}

trait TryParseHeaderAs<R> {
	fn try_parse_header_as(&self, header_name: &'static str) -> Result<Option<R>, Error>;
}

impl<R: FromStr> TryParseHeaderAs<R> for HeaderMap<'_> {
	fn try_parse_header_as(&self, header_name: &'static str) -> Result<Option<R>, Error> {
		let value: Option<R> = match self.get_one(header_name) {
			Some(value) => Some(value.parse().map_err(|_| Error::Invalid(header_name))?),
			None => None,
		};
		Ok(value)
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for OptionUserId {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		OptionUserId::from_request_headers(request.headers())
	}
}

#[cfg(test)]
mod test {
	use rocket::http::{Header, HeaderMap};
	use rstest::rstest;
	use uuid::Uuid;

	use super::*;

	#[rstest]
	#[case(Uuid::default())]
	#[case(Uuid::from_u128(42))]
	fn from_valid_headers(#[case] user_id: Uuid) {
		let mut header_map = HeaderMap::new();
		header_map.add(Header::new(HASURA_USER_ID_HEADER_KEY, user_id.to_string()));

		match OptionUserId::from_request_headers(&header_map) {
			Outcome::Success(user) => {
				assert_eq!(user.user_id(), Ok(user_id.into()));
			},
			_ => panic!(),
		}
	}

	#[rstest]
	fn from_missing_headers() {
		let header_map = HeaderMap::new();

		match OptionUserId::from_request_headers(&header_map) {
			Outcome::Success(user) => {
				assert_eq!(
					user.user_id(),
					Err(Error::Missing(HASURA_USER_ID_HEADER_KEY))
				);
			},
			_ => panic!(),
		}
	}

	#[rstest]
	fn from_invalid_user_id() {
		let mut header_map = HeaderMap::new();
		header_map.add(Header::new(HASURA_USER_ID_HEADER_KEY, "some random string"));

		assert_eq!(
			OptionUserId::from_request_headers(&header_map),
			Outcome::Failure((
				Status::BadRequest,
				Error::Invalid(HASURA_USER_ID_HEADER_KEY)
			))
		)
	}
}
