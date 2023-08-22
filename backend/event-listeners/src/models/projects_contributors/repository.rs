use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId, ProjectId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{
		schema::{contributions, project_github_repos, projects_contributors::dsl},
		Result,
	},
};

use super::ProjectsContributor;

pub trait Repository: database::ImmutableRepository<ProjectsContributor> {
	fn refresh_project_contributor_list(&self, project_id: &ProjectId) -> Result<()>;
}

impl Repository for database::Client {
	fn refresh_project_contributor_list(&self, project_id: &ProjectId) -> Result<()> {
		let mut connection = self.connection()?;
		connection
			.transaction::<_, diesel::result::Error, _>(|tx| {
				diesel::delete(dsl::projects_contributors)
					.filter(dsl::project_id.eq(project_id))
					.execute(&mut *tx)?;

				let repos: Vec<GithubRepoId> = project_github_repos::dsl::project_github_repos
					.select(project_github_repos::dsl::github_repo_id)
					.filter(project_github_repos::dsl::project_id.eq(project_id))
					.load(&mut *tx)?;

				let contributors: Vec<GithubUserId> = contributions::dsl::contributions
					.select(contributions::dsl::user_id)
					.distinct()
					.filter(contributions::dsl::repo_id.eq_any(repos))
					.load(&mut *tx)?;

				contributors.iter().try_for_each(|user_id| {
					diesel::insert_into(dsl::projects_contributors)
						.values((
							dsl::project_id.eq(project_id),
							dsl::github_user_id.eq(user_id),
						))
						.execute(&mut *tx)?;
					Ok::<(), diesel::result::Error>(())
				})?;

				Ok(())
			})
			.err_with_context(format!(
				"refreshing contributors of project with id={project_id}"
			))?;
		Ok(())
	}
}
