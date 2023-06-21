mod repository;
use diesel::Identifiable;
use domain::{GithubRepoId, ProjectId};
use infrastructure::database::schema::project_github_repos;
pub use repository::Repository;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(project_id, github_repo_id))]
pub struct ProjectGithubRepo {
	pub project_id: ProjectId,
	pub github_repo_id: GithubRepoId,
}

impl Identifiable for ProjectGithubRepo {
	type Id = (ProjectId, GithubRepoId);

	fn id(self) -> Self::Id {
		(self.project_id, self.github_repo_id)
	}
}
