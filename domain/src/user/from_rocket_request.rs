use std::str::FromStr;

use async_trait::async_trait;
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};
use thiserror::Error;
use uuid::Uuid;

use super::Id;

const HASURA_USER_ID_HEADER_KEY: &str = "x-hasura-user-id";

#[derive(Debug, Error)]
pub enum IdFromRequestError {
	#[error("{HASURA_USER_ID_HEADER_KEY} header is not present")]
	Missing,
	#[error("{HASURA_USER_ID_HEADER_KEY} header is invalid")]
	Invalid,
}

pub struct MaybeId(Option<Id>);

impl MaybeId {
	pub fn get(&self) -> Option<Id> {
		self.0
	}

	pub fn ok(&self) -> Result<Id, IdFromRequestError> {
		self.0.ok_or(IdFromRequestError::Missing)
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for MaybeId {
	type Error = IdFromRequestError;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		match request.headers().get_one(HASURA_USER_ID_HEADER_KEY) {
			Some(id) => match Uuid::from_str(id) {
				Ok(uuid) => Outcome::Success(MaybeId(Some(Id::from(uuid)))),
				Err(_) => Outcome::Failure((Status::BadRequest, IdFromRequestError::Invalid)),
			},
			_ => Outcome::Success(MaybeId(None)),
		}
	}
}
