use std::sync::Arc;

use anyhow::{anyhow, Error};
use infrastructure::database::ImmutableRepository;
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{application::project::ignored_contributions::Usecase, models::IgnoredContribution};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let ignored_contributions_repository =
			match request.rocket().state::<Arc<dyn ImmutableRepository<IgnoredContribution>>>() {
				Some(database) => database,
				None =>
					return Outcome::Failure((
						Status::InternalServerError,
						anyhow!("Missing ignored_contributions repository"),
					)),
			};

		Outcome::Success(Self::new(ignored_contributions_repository.clone()))
	}
}
