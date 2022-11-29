use ::domain::ProjectId;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;

use crate::domain::github::GithubRepositoryId;

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct Entity {
	project_id: ProjectId,
	github_repo_id: GithubRepositoryId,
	description: Option<String>,
	telegram_link: Option<String>,
}
