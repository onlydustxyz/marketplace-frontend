mod repository;
use diesel::Identifiable;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::projects_pending_contributors;
pub use repository::Repository;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(project_id, github_user_id))]
pub struct ProjectsPendingContributor {
	pub project_id: ProjectId,
	pub github_user_id: GithubUserId,
}

impl Identifiable for ProjectsPendingContributor {
	type Id = (ProjectId, GithubUserId);

	fn id(self) -> Self::Id {
		(self.project_id, self.github_user_id)
	}
}
