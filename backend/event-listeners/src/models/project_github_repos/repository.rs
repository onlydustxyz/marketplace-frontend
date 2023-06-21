use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, ProjectId};
use infrastructure::{
	database,
	database::{schema::project_github_repos::dsl, Result},
};

use super::ProjectGithubRepo;

pub trait Repository: database::ImmutableRepository<ProjectGithubRepo> {
	fn find_projects_of_repo(&self, github_repo_id: &GithubRepoId) -> Result<Vec<ProjectId>>;
}

impl Repository for database::Client {
	fn find_projects_of_repo(&self, github_repo_id: &GithubRepoId) -> Result<Vec<ProjectId>> {
		let mut connection = self.connection()?;
		let projects = dsl::project_github_repos
			.select(dsl::project_id)
			.filter(dsl::github_repo_id.eq(github_repo_id))
			.load(&mut *connection)?;
		Ok(projects)
	}
}
