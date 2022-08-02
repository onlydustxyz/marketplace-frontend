use crate::domain::*;
use mockall::automock;
use std::sync::Arc;

#[automock]
pub trait Usecase: Send + Sync {
	fn find_by_id(
		&self,
		contributor_id: ContributorId,
	) -> Result<Option<Contributor>, ContributorRepositoryError>;
}

pub struct GetContributor {
	contributor_repository: Arc<dyn ContributorRepository>,
}

impl Usecase for GetContributor {
	fn find_by_id(
		&self,
		contributor_id: ContributorId,
	) -> Result<Option<Contributor>, ContributorRepositoryError> {
		self.contributor_repository.find(contributor_id)
	}
}

impl GetContributor {
	pub fn new_usecase(contributor_repository: Arc<dyn ContributorRepository>) -> Box<dyn Usecase> {
		Box::new(Self {
			contributor_repository,
		})
	}
}
