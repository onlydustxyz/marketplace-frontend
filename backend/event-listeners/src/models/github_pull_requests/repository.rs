use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{
		schema::{github_pull_request_commits, github_pull_requests},
		Result,
	},
};

use super::PullRequest;
use crate::diesel::Connection;

pub trait Repository: Send + Sync {
	fn upsert(&self, pull_request: PullRequest) -> Result<()>;
}

impl Repository for database::Client {
	fn upsert(&self, pull_request: PullRequest) -> Result<()> {
		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				diesel::delete(github_pull_request_commits::table.filter(
					github_pull_request_commits::pull_request_id.eq(pull_request.inner.id),
				))
				.execute(&mut *connection)?;

				diesel::insert_into(github_pull_requests::table)
					.values(&pull_request.inner)
					.on_conflict(github_pull_requests::id)
					.do_update()
					.set(&pull_request.inner)
					.execute(&mut *connection)?;

				diesel::insert_into(github_pull_request_commits::table)
					.values(pull_request.commits)
					.execute(&mut *connection)?;

				Ok(())
			})
			.err_with_context(format!(
				"delete+insert github_pull_requests/github_pull_request_commits where pull_request_id={}",
				pull_request.inner.id
			))?;

		Ok(())
	}
}
