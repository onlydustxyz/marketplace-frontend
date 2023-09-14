use std::sync::Arc;

use anyhow::{anyhow, Error};
use domain::{AggregateRepository, Budget, Event, Project, Publisher};
use infrastructure::amqp::UniqueMessage;
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::application::budget::allocate::Usecase;

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let event_publisher =
			match request.rocket().state::<Arc<dyn Publisher<UniqueMessage<Event>>>>() {
				Some(publisher) => publisher,
				None =>
					return Outcome::Failure((
						Status::InternalServerError,
						anyhow!("Missing event publisher"),
					)),
			};

		let project_repository = match request.rocket().state::<AggregateRepository<Project>>() {
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing project repository"),
				)),
		};

		let budget_repository = match request.rocket().state::<AggregateRepository<Budget>>() {
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing budget repository"),
				)),
		};

		Outcome::Success(Self::new(
			event_publisher.clone(),
			project_repository.clone(),
			budget_repository.clone(),
		))
	}
}
