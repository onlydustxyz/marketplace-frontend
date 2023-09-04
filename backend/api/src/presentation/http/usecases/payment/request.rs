use std::sync::Arc;

use anyhow::{anyhow, Error};
use domain::{AggregateRootRepository, Event, Project, Publisher};
use infrastructure::{amqp::CommandMessage, http};
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{application::payment::request::Usecase, Config};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let config = match request.rocket().state::<Config>() {
			Some(config) => config,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing configuration"),
				)),
		};

		let headers = request
			.headers()
			.get(reqwest::header::AUTHORIZATION.as_str())
			.map(|value| (reqwest::header::AUTHORIZATION, value.parse().unwrap()))
			.collect();

		let http_client = match http::Client::new(config.indexer_client.clone(), headers) {
			Ok(client) => client,
			Err(e) => return Outcome::Failure((Status::InternalServerError, e)),
		};

		let event_publisher =
			match request.rocket().state::<Arc<dyn Publisher<CommandMessage<Event>>>>() {
				Some(publisher) => publisher,
				None =>
					return Outcome::Failure((
						Status::InternalServerError,
						anyhow!("Missing command publisher"),
					)),
			};

		let project_repository = match request.rocket().state::<AggregateRootRepository<Project>>()
		{
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing project repository"),
				)),
		};

		Outcome::Success(Self::new(
			event_publisher.clone(),
			project_repository.clone(),
			Arc::new(http_client),
		))
	}
}
