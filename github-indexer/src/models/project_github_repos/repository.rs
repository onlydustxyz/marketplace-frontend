use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, ProjectId};
use infrastructure::{
	contextualized_error::IntoContextualizedError, database::schema::project_github_repos::dsl,
	dbclient, dbclient::Result,
};

use super::ProjectGithubRepo;

pub trait Repository: dbclient::ImmutableRepository<ProjectGithubRepo> {
	fn find_projects_of_repo(&self, github_repo_id: &GithubRepoId) -> Result<Vec<ProjectId>>;
}

impl Repository for dbclient::Client {
	fn find_projects_of_repo(&self, github_repo_id: &GithubRepoId) -> Result<Vec<ProjectId>> {
		let mut connection = self.connection()?;
		let projects = dsl::project_github_repos
			.select(dsl::project_id)
			.filter(dsl::github_repo_id.eq(github_repo_id))
			.load(&mut *connection)
			.err_with_context(format!(
				"select project_id from project_github_repos where github_repo_id={github_repo_id}"
			))?;
		Ok(projects)
	}
}
