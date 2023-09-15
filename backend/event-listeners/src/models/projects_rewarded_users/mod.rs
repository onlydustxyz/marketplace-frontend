mod repository;
use diesel::Identifiable;
use domain::{GithubUserId, ProjectId};
use infrastructure::database::schema::projects_rewarded_users;
pub use repository::Repository;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model)]
#[diesel(primary_key(project_id, github_user_id))]
pub struct ProjectsRewardedUser {
	pub project_id: ProjectId,
	pub github_user_id: GithubUserId,
	pub reward_count: i32,
}

impl Identifiable for ProjectsRewardedUser {
	type Id = (ProjectId, GithubUserId);

	fn id(self) -> Self::Id {
		(self.project_id, self.github_user_id)
	}
}
