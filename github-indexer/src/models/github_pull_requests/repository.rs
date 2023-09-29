use diesel::{ExpressionMethods, JoinOnDsl, OptionalExtension, QueryDsl, RunQueryDsl};
use domain::{GithubPullRequestNumber, GithubRepoId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database::schema::{
		closing_issues, github_pull_request_commits, github_pull_request_reviews,
		github_pull_requests, github_repos,
	},
	dbclient,
	dbclient::Result,
};

use super::{pull_request::GithubPullRequest, PullRequest as GithubFullPullRequest};
use crate::{diesel::Connection, models::IdentifiableRepository};

pub trait Repository: Send + Sync {
	fn upsert(&self, pull_request: GithubFullPullRequest) -> Result<()>;
}

impl Repository for dbclient::Client {
	fn upsert(&self, pull_request: GithubFullPullRequest) -> Result<()> {
		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				if let Some(commits) = pull_request.commits {
					diesel::delete(github_pull_request_commits::table.filter(
						github_pull_request_commits::pull_request_id.eq(pull_request.inner.id),
					))
					.execute(&mut *connection)?;

					diesel::insert_into(github_pull_request_commits::table)
						.values(commits)
						.on_conflict_do_nothing()
						.execute(&mut *connection)?;
				}

				if let Some(reviews) = pull_request.reviews {
										diesel::delete(github_pull_request_reviews::table.filter(
						github_pull_request_reviews::pull_request_id.eq(pull_request.inner.id),
					))
					.execute(&mut *connection)?;

					diesel::insert_into(github_pull_request_reviews::table)
						.values(reviews)
						.on_conflict_do_nothing()
						.execute(&mut *connection)?;
				}

				if let Some(closing_issues) = pull_request.closing_issues {
					diesel::delete(closing_issues::table.filter(
						closing_issues::github_pull_request_id.eq(pull_request.inner.id),
					))
					.execute(&mut *connection)?;

					diesel::insert_into(closing_issues::table)
						.values(closing_issues)
						.on_conflict_do_nothing()
						.execute(&mut *connection)?;
				}

				diesel::insert_into(github_pull_requests::table)
					.values(&pull_request.inner)
					.on_conflict(github_pull_requests::id)
					.do_update()
					.set(&pull_request.inner)
					.execute(&mut *connection)?;

				Ok(())
			})
			.err_with_context(format!(
				"delete+insert github_pull_requests/github_pull_request_commits/github_pull_request_reviews where pull_request_id={}",
				pull_request.inner.id
			))?;

		Ok(())
	}
}

impl IdentifiableRepository<GithubPullRequest, (GithubRepoId, GithubPullRequestNumber)>
	for dbclient::Client
{
	fn find(
		&self,
		(repo_id, number): (GithubRepoId, GithubPullRequestNumber),
	) -> dbclient::Result<Option<GithubPullRequest>> {
		let mut connection = self.connection()?;
		github_pull_requests::table
			.filter(github_pull_requests::repo_id.eq(repo_id))
			.filter(github_pull_requests::number.eq(number))
			.get_result(&mut *connection)
			.optional()
			.err_with_context(format!(
				"exists github_pull_requests where repo_id={repo_id:?} and number={number:?}",
			))
			.map_err(Into::into)
	}
}

impl IdentifiableRepository<GithubPullRequest, (String, String, GithubPullRequestNumber)>
	for dbclient::Client
{
	fn find(
		&self,
		(repo_owner, repo_name, number): (String, String, GithubPullRequestNumber),
	) -> dbclient::Result<Option<GithubPullRequest>> {
		let mut connection = self.connection()?;
		github_pull_requests::table
			.inner_join(
				github_repos::table.on(github_repos::id.eq(github_pull_requests::repo_id)),
			)
			.filter(github_repos::owner.eq(&repo_owner))
			.filter(github_repos::name.eq(&repo_name))
			.filter(github_pull_requests::number.eq(number))
			.select(github_pull_requests::all_columns)
			.get_result(&mut *connection)
			.optional()
			.err_with_context(format!(
				"exists github_pull_requests join github_repos where repo_owner={repo_owner}, repo_name={repo_name} and number={number}",
			))
			.map_err(Into::into)
	}
}
