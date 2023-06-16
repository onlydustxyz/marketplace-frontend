use diesel::Identifiable;
use domain::{GithubRepoId, GithubUserId};
use infrastructure::database::schema::github_repos_contributors;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(repo_id, user_id))]
pub struct GithubReposContributor {
	pub repo_id: GithubRepoId,
	pub user_id: GithubUserId,
}

impl Identifiable for GithubReposContributor {
	type Id = (GithubRepoId, GithubUserId);

	fn id(self) -> Self::Id {
		(self.repo_id, self.user_id)
	}
}
