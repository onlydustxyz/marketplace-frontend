#[cfg(test)]
mod tests;

mod contribution;
pub use contribution::*;

mod contributor;
pub use contributor::*;

use crate::domain::*;
use mapinto::ResultMapErrInto;

pub fn apply_to_contribution<A: ApplicationRepository, U: UuidGenerator>(
	application_repository: &A,
	uuid_generator: &mut U,
	contribution_id: ContributionId,
	contributor_id: ContributorId,
) -> Result<(), DomainError> {
	let id = uuid_generator.new_uuid();

	let application = Application::new(id, contribution_id, contributor_id);

	application_repository.store(application).map_err_into()
}
