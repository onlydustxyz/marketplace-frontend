use crate::{domain::*, infrastructure::starknet};
use rocket::{
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request, State,
};
use rocket_okapi::{
	gen::OpenApiGenerator,
	request::{OpenApiFromRequest, RequestHeaderInput},
};
use std::sync::Arc;

pub trait Usecase {
	fn prepare(&self, contribution: Contribution) -> Result<()>;
	fn commit(&self, contribution: Contribution) -> Result<()>;
}

pub struct CreateContribution {
	contribution_service: Arc<dyn ContributionService>,
}

impl Usecase for CreateContribution {
	fn prepare(&self, contribution: Contribution) -> Result<()> {
		self.contribution_service.create(contribution)
	}

	fn commit(&self, _contribution: Contribution) -> Result<()> {
		Ok(())
	}
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for CreateContribution {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		let starknet: &Arc<starknet::SingleAdminClient> =
			try_outcome!(request.guard::<&State<Arc<starknet::SingleAdminClient>>>().await);

		Outcome::Success(Self {
			contribution_service: starknet.clone(),
		})
	}
}

impl<'r> OpenApiFromRequest<'r> for CreateContribution {
	fn from_request_input(
		_gen: &mut OpenApiGenerator,
		_name: String,
		_required: bool,
	) -> rocket_okapi::Result<RequestHeaderInput> {
		Ok(RequestHeaderInput::None)
	}
}
