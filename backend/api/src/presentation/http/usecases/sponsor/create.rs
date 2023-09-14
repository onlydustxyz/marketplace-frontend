use anyhow::Error;
use rocket::{
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{application::sponsor::create::Usecase, presentation::http::usecases::FromRocketState};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		Outcome::Success(Self::new(
			try_outcome!(FromRocketState::from_state(request.rocket())),
			try_outcome!(FromRocketState::from_state(request.rocket())),
		))
	}
}
