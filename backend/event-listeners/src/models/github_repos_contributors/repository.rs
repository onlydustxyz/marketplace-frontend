use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::{
	database,
	database::{schema::github_repos_contributors::dsl, Result},
};

use super::GithubReposContributor;

pub trait Repository: database::ImmutableRepository<GithubReposContributor> {
	fn find_contributors_of_repo(&self, github_repo_id: &GithubRepoId)
	-> Result<Vec<GithubUserId>>;
}

impl Repository for database::Client {
	fn find_contributors_of_repo(
		&self,
		github_repo_id: &GithubRepoId,
	) -> Result<Vec<GithubUserId>> {
		let mut connection = self.connection()?;
		let contributors = dsl::github_repos_contributors
			.select(dsl::user_id)
			.filter(dsl::repo_id.eq(github_repo_id))
			.load(&mut *connection)?;
		Ok(contributors)
	}
}
