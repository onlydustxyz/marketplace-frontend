use std::str::FromStr;

use async_trait::async_trait;
use domain::UserId;
use rocket::{
	http::{HeaderMap, Status},
	request::{FromRequest, Outcome},
	Request,
};
use thiserror::Error;
use uuid::Uuid;

const HASURA_USER_ID_HEADER_KEY: &str = "x-hasura-user-id";

#[derive(Debug, Error, PartialEq, Eq)]
pub enum OptionUserIdFromRequestError {
	#[error("{HASURA_USER_ID_HEADER_KEY} header is not present")]
	Missing,
	#[error("{HASURA_USER_ID_HEADER_KEY} header is invalid")]
	Invalid,
}

#[derive(Debug, PartialEq, Eq)]
pub struct OptionUserId(Option<UserId>);

impl OptionUserId {
	pub fn ok(&self) -> Result<UserId, OptionUserIdFromRequestError> {
		self.0.ok_or(OptionUserIdFromRequestError::Missing)
	}
}

impl OptionUserId {
	fn from_request_headers<'r>(
		headers: &HeaderMap<'r>,
	) -> Outcome<Self, <Self as FromRequest<'r>>::Error> {
		match headers.get_one(HASURA_USER_ID_HEADER_KEY) {
			Some(id) => match Uuid::from_str(id) {
				Ok(uuid) => Outcome::Success(OptionUserId(Some(UserId::from(uuid)))),
				Err(_) =>
					Outcome::Failure((Status::BadRequest, OptionUserIdFromRequestError::Invalid)),
			},
			_ => Outcome::Success(OptionUserId(None)),
		}
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for OptionUserId {
	type Error = OptionUserIdFromRequestError;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		OptionUserId::from_request_headers(request.headers())
	}
}

#[cfg(test)]
mod test {
	use rocket::{
		http::{Header, HeaderMap},
		request::Outcome,
	};
	use rstest::rstest;

	use super::{
		OptionUserId, OptionUserIdFromRequestError, Status, UserId, Uuid, HASURA_USER_ID_HEADER_KEY,
	};

	#[rstest]
	#[case(
		Header::new(HASURA_USER_ID_HEADER_KEY, uuid::Uuid::default().to_string()),
		rocket::outcome::Outcome::Success(OptionUserId(Some(UserId::default())))
	)]
	#[case(
		Header::new(HASURA_USER_ID_HEADER_KEY, Uuid::from_u128(42).to_string()),
		rocket::outcome::Outcome::Success(OptionUserId(Some(Uuid::from_u128(42).into())))
	)]
	#[case(
		Header::new("the header won't be set", uuid::Uuid::default().to_string()),
		rocket::outcome::Outcome::Success(OptionUserId(None))
	)]
	#[case(
		Header::new(HASURA_USER_ID_HEADER_KEY, "some random string"),
		rocket::outcome::Outcome::Failure((Status::BadRequest, OptionUserIdFromRequestError::Invalid))
	)]
	fn from_headers(
		#[case] header: Header,
		#[case] expect: Outcome<OptionUserId, OptionUserIdFromRequestError>,
	) {
		let mut header_map = HeaderMap::new();
		header_map.add(header);

		assert_eq!(OptionUserId::from_request_headers(&header_map), expect)
	}
}
