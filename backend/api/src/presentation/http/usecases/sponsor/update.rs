use std::sync::Arc;

use anyhow::{anyhow, Error};
use infrastructure::database::Repository;
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{application::sponsor::update::Usecase, domain::ImageStoreService, models::Sponsor};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
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

		Outcome::Success(Self::new(sponsor_repository.clone(), image_store.clone()))
	}
}
