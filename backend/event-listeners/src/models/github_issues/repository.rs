use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubIssueNumber, GithubRepoId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database::{self, schema::github_issues},
};

use crate::models::{GithubIssue, IdentifiableRepository};

impl IdentifiableRepository<GithubIssue, (GithubRepoId, GithubIssueNumber)> for database::Client {
	fn exists(
		&self,
		(repo_id, number): (GithubRepoId, GithubIssueNumber),
	) -> database::Result<bool> {
		let mut connection = self.connection()?;
		diesel::select(::diesel::dsl::exists(
			github_issues::table
				.filter(github_issues::repo_id.eq(repo_id))
				.filter(github_issues::number.eq(number)),
		))
		.get_result(&mut *connection)
		.err_with_context(format!(
			"exists github_issues where repo_id={repo_id:?} and number={number:?}",
		))
		.map_err(Into::into)
	}
}
