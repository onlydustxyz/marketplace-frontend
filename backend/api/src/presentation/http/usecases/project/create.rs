use std::sync::Arc;

use anyhow::{anyhow, Error};
use domain::{Event, Publisher};
use infrastructure::{amqp::UniqueMessage, database::Repository};
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{
	application::project::create::Usecase,
	domain::ImageStoreService,
	models::{ProjectDetails, Sponsor},
};

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

		let project_details_repository =
			match request.rocket().state::<Arc<dyn Repository<ProjectDetails>>>() {
				Some(repository) => repository,
				None =>
					return Outcome::Failure((
						Status::InternalServerError,
						anyhow!("Missing project details repository"),
					)),
			};

		let image_store = match request.rocket().state::<Arc<dyn ImageStoreService>>() {
			Some(service) => service,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing image store service"),
				)),
		};

		let sponsor_repository = match request.rocket().state::<Arc<dyn Repository<Sponsor>>>() {
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing sponsor repository"),
				)),
		};

		Outcome::Success(Self::new(
			event_publisher.clone(),
			project_details_repository.clone(),
			image_store.clone(),
			sponsor_repository.clone(),
		))
	}
}
