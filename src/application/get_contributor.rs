use crate::{domain::*, infrastructure::database};
use rocket::{
	outcome::try_outcome,
	request::{FromRequest, Outcome},
	Request,
};
use rocket_okapi::OpenApiFromRequest;

pub trait Usecase {
	fn execute(&self, contributor_id: ContributorId) -> Result<Option<Contributor>>;
}

#[derive(OpenApiFromRequest)]
pub struct GetContributor {
	contributor_repository: Box<dyn ContributorRepository>,
}

impl Usecase for GetContributor {
	fn execute(&self, contributor_id: ContributorId) -> Result<Option<Contributor>> {
		self.contributor_repository.by_id(contributor_id)
	}
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for GetContributor {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		let connection = try_outcome!(request.guard::<database::Connection>().await);

		Outcome::Success(Self {
			contributor_repository: Box::new(database::Client::new(connection)),
		})
	}
}
