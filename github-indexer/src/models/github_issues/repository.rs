use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::{GithubIssueNumber, GithubRepoId};
use infrastructure::{
	contextualized_error::IntoContextualizedError, database::schema::github_issues, dbclient,
};

use crate::models::{GithubIssue, IdentifiableRepository};

impl IdentifiableRepository<GithubIssue, (GithubRepoId, GithubIssueNumber)> for dbclient::Client {
	fn find(
		&self,
		(repo_id, number): (GithubRepoId, GithubIssueNumber),
	) -> dbclient::Result<Option<GithubIssue>> {
		let mut connection = self.connection()?;
		github_issues::table
			.filter(github_issues::repo_id.eq(repo_id))
			.filter(github_issues::number.eq(number))
			.get_result(&mut *connection)
			.optional()
			.err_with_context(format!(
				"exists github_issues where repo_id={repo_id:?} and number={number:?}",
			))
			.map_err(Into::into)
	}
}
