use crate::{domain::*, infrastructure::database::Client};

impl ContributorRepository for Client {
	fn by_id(&self, contributor_id: ContributorId) -> Result<Option<Contributor>> {
		// TODO: Target contributors table once implemented
		Ok(Some(Contributor {
			id: contributor_id,
			discord_handle: None,
			github_handle: None,
			github_username: None,
		}))
	}
}
