use std::{collections::HashSet, sync::Arc};

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubRepoId, GithubUserId};

use super::{
	error::{Error, Result},
	Projector,
};
use crate::models::{
	GithubUserIndex, GithubUserIndexRepository, ProjectGithubRepoRepository,
	ProjectsContributorRepository, ProjectsPendingContributorRepository,
};

#[derive(new)]
pub struct ContributorsProjector {
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

#[async_trait]
impl Projector<GithubRepoId> for ContributorsProjector {
	// This projector refreshes the list of contributors of repo's projects, based on the
	// contributions belonging to each project.
	// It also ensures every new contributor is indexed.
	async fn perform_projections(&self, repo_id: GithubRepoId) -> Result<()> {
		self.project_github_repos_repository
			.find_projects_of_repo(&repo_id)?
			.iter()
			.try_for_each(|project_id| {
				let contributors: HashSet<GithubUserId> = HashSet::from_iter(
					self.projects_contributors_repository
						.refresh_project_contributor_list(project_id)?,
				);
				let pending_contributors: HashSet<GithubUserId> = HashSet::from_iter(
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(project_id)?,
				);

				let all_contributors: Vec<GithubUserIndex> = contributors
					.union(&pending_contributors)
					.map(|user_id| GithubUserIndex {
						user_id: *user_id,
						..Default::default()
					})
					.collect();

				self.github_user_index_repository.try_insert_all(all_contributors)?;
				Ok::<(), Error>(())
			})?;
		Ok(())
	}
}
