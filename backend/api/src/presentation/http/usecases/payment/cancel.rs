use std::sync::Arc;

use anyhow::{anyhow, Error};
use domain::{AggregateRepository, Event, Payment, Publisher};
use infrastructure::amqp::CommandMessage;
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::application::payment::cancel::Usecase;

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let event_publisher =
			match request.rocket().state::<Arc<dyn Publisher<CommandMessage<Event>>>>() {
				Some(publisher) => publisher,
				None =>
					return Outcome::Failure((
						Status::InternalServerError,
						anyhow!("Missing command publisher"),
					)),
			};

		let payment_repository = match request.rocket().state::<AggregateRepository<Payment>>() {
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing payment repository"),
				)),
		};

		Outcome::Success(Self::new(
			event_publisher.clone(),
			payment_repository.clone(),
		))
	}
}
