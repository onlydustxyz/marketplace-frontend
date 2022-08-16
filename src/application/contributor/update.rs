use crate::domain::*;
use mapinto::ResultMapErrInto;
use mockall::automock;
use std::sync::Arc;

#[automock]
pub trait Usecase: Send + Sync {
	fn update_contributor(
		&self,
		contributor_id: ContributorId,
		contributor: Contributor,
	) -> Result<(), DomainError>;
}

pub struct UpdateContributor {
	contributor_repository: Arc<dyn ContributorRepository>,
}

impl UpdateContributor {
	pub fn new_usecase_boxed(
		contributor_repository: Arc<dyn ContributorRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			contributor_repository,
		})
	}
}

impl Usecase for UpdateContributor {
	fn update_contributor(
		&self,
		contributor_id: ContributorId,
		contributor: Contributor,
	) -> Result<(), DomainError> {
		self.contributor_repository
			.update_contributor(contributor_id, contributor)
			.map_err_into()
	}
}
