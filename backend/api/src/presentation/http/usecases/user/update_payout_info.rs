use std::sync::Arc;

use anyhow::{anyhow, Error};
use rocket::{
	http::Status,
	request::{FromRequest, Outcome},
	Request,
};

use crate::{
	application::user::update_payout_info::Usecase, domain::IsEnsValid, infrastructure::web3::ens,
	models::PayoutInfoRepository,
};

#[async_trait]
impl<'r> FromRequest<'r> for Usecase {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Usecase, Self::Error> {
		let payout_info_repository = match request.rocket().state::<Arc<dyn PayoutInfoRepository>>()
		{
			Some(repository) => repository,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing user_payout_info repository"),
				)),
		};

		let ens = match request.rocket().state::<Arc<ens::Client>>() {
			Some(ens) => ens,
			None =>
				return Outcome::Failure((
					Status::InternalServerError,
					anyhow!("Missing ens client"),
				)),
		};

		Outcome::Success(Self::new(
			payout_info_repository.clone(),
			IsEnsValid::new(ens.clone()),
		))
	}
}
