use crate::domain::*;
use mapinto::ResultMapErrInto;
use mockall::automock;
use std::sync::Arc;

#[automock]
pub trait Usecase: Send + Sync {
	fn insert_contributor(&self, contributor_id: ContributorId) -> Result<(), DomainError>;
}

pub struct NewContributor {
	contributor_repository: Arc<dyn ContributorRepository>,
}

impl Usecase for NewContributor {
	fn insert_contributor(&self, contributor_id: ContributorId) -> Result<(), DomainError> {
		let contributor = Contributor {
			id: contributor_id,
			github_username: None,
			github_handle: None,
			discord_handle: None,
		};
		self.contributor_repository.store(contributor).map_err_into()
	}
}

impl NewContributor {
	pub fn new_usecase_boxed(
		contributor_repository: Arc<dyn ContributorRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			contributor_repository,
		})
	}
}
