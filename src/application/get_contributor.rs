use crate::{domain::*, infrastructure::database};
use rocket::{
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request, State,
};
use rocket_okapi::{
	gen::OpenApiGenerator,
	request::{OpenApiFromRequest, RequestHeaderInput},
};

pub trait Usecase {
	fn execute(&self, contributor_id: ContributorId) -> Result<Option<Contributor>>;
}

pub struct GetContributor<'r> {
	contributor_repository: &'r dyn ContributorRepository,
}

impl Usecase for GetContributor<'_> {
	fn execute(&self, contributor_id: ContributorId) -> Result<Option<Contributor>> {
		self.contributor_repository.by_id(contributor_id)
	}
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for GetContributor<'r> {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		let database: &database::Client =
			try_outcome!(request.guard::<&State<database::Client>>().await);

		Outcome::Success(Self {
			contributor_repository: database,
		})
	}
}

impl<'r> OpenApiFromRequest<'r> for GetContributor<'r> {
	fn from_request_input(
		_gen: &mut OpenApiGenerator,
		_name: String,
		_required: bool,
	) -> rocket_okapi::Result<RequestHeaderInput> {
		Ok(RequestHeaderInput::None)
	}
}
