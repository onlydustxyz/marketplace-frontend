use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId, ProjectId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{
		enums::ContributionStatus,
		schema::{contributions, project_github_repos, projects_pending_contributors::dsl},
		Result,
	},
};

use super::ProjectsPendingContributor;

pub trait Repository: database::ImmutableRepository<ProjectsPendingContributor> {
	fn refresh_project_pending_contributor_list(
		&self,
		project_id: &ProjectId,
	) -> Result<Vec<GithubUserId>>;
}

impl Repository for database::Client {
	fn refresh_project_pending_contributor_list(
		&self,
		project_id: &ProjectId,
	) -> Result<Vec<GithubUserId>> {
		let mut connection = self.connection()?;

		let mut contributors: Vec<GithubUserId> = vec![];
		connection
			.transaction::<_, diesel::result::Error, _>(|tx| {
				diesel::delete(dsl::projects_pending_contributors)
					.filter(dsl::project_id.eq(project_id))
					.execute(&mut *tx)?;

				let repos: Vec<GithubRepoId> = project_github_repos::dsl::project_github_repos
					.select(project_github_repos::dsl::github_repo_id)
					.filter(project_github_repos::dsl::project_id.eq(project_id))
					.load(&mut *tx)?;

				contributors = contributions::dsl::contributions
					.select(contributions::dsl::user_id)
					.distinct()
					.filter(contributions::dsl::repo_id.eq_any(repos))
					.filter(contributions::dsl::status.eq(ContributionStatus::InProgress))
					.load(&mut *tx)?;

				contributors.iter().try_for_each(|user_id| {
					diesel::insert_into(dsl::projects_pending_contributors)
						.values((
							dsl::project_id.eq(project_id),
							dsl::github_user_id.eq(user_id),
						))
						.on_conflict_do_nothing()
						.execute(&mut *tx)?;
					Ok::<(), diesel::result::Error>(())
				})?;

				Ok(())
			})
			.err_with_context(format!(
				"refreshing pending contributors of project with id={project_id}"
			))?;
		Ok(contributors)
	}
}
