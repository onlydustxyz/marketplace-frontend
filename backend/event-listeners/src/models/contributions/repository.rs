use std::collections::HashSet;

use diesel::{Connection, ExpressionMethods, QueryDsl, QueryResult, RunQueryDsl};
use domain::{GithubRepoId, GithubUserId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{enums::ContributionType, schema::contributions::dsl, Result},
};

use super::{Contribution, DetailsId};
use crate::models::{GithubIssue, GithubPullRequest};

pub trait Repository: Sync + Send {
	fn upsert_from_github_issue(&self, issue: GithubIssue) -> Result<()>;
	fn upsert_from_github_pull_request(&self, pull_request: GithubPullRequest) -> Result<()>;
	fn find_contributors_of_repo(&self, github_repo_id: &GithubRepoId)
	-> Result<Vec<GithubUserId>>;
}

impl Repository for database::Client {
	fn upsert_from_github_issue(&self, issue: GithubIssue) -> Result<()> {
		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				diesel::delete(
					dsl::contributions.filter(dsl::details_id.eq(DetailsId::from(issue.id))),
				)
				.execute(&mut *connection)?;

				issue
					.assignee_ids
					.0
					.into_iter()
					.map(|assignee| Contribution {
						repo_id: issue.repo_id,
						user_id: assignee,
						type_: ContributionType::Issue,
						details_id: issue.id.into(),
					})
					.try_for_each(|c| -> QueryResult<()> {
						diesel::insert_into(dsl::contributions)
							.values(c)
							.execute(&mut *connection)?;
						Ok(())
					})?;

				Ok(())
			})
			.err_with_context(format!(
				"delete+insert contribution where type='Issue' and details_id={}",
				issue.id
			))?;

		Ok(())
	}

	fn upsert_from_github_pull_request(&self, pull_request: GithubPullRequest) -> Result<()> {
		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				diesel::delete(
					dsl::contributions
						.filter(dsl::details_id.eq(DetailsId::from(pull_request.inner.id))),
				)
				.execute(&mut *connection)?;

				{
					let user_ids: HashSet<GithubUserId> =
						pull_request.commits.into_iter().map(|commit| commit.author_id).collect();

					user_ids
						.into_iter()
						.map(|user_id| Contribution {
							repo_id: pull_request.inner.repo_id,
							user_id,
							type_: ContributionType::PullRequest,
							details_id: pull_request.inner.id.into(),
						})
						.try_for_each(|c| -> QueryResult<()> {
							diesel::insert_into(dsl::contributions)
								.values(c)
								.execute(&mut *connection)?;
							Ok(())
						})?;
				}

				{
					let user_ids: HashSet<GithubUserId> =
						pull_request.reviews.into_iter().map(|review| review.reviewer_id).collect();

					user_ids
						.into_iter()
						.map(|user_id| Contribution {
							repo_id: pull_request.inner.repo_id,
							user_id,
							type_: ContributionType::CodeReview,
							details_id: pull_request.inner.id.into(),
						})
						.try_for_each(|c| -> QueryResult<()> {
							diesel::insert_into(dsl::contributions)
								.values(c)
								.execute(&mut *connection)?;
							Ok(())
						})?;
				}

				Ok(())
			})
			.err_with_context(format!(
				"delete+insert contribution where type='PullRequest|CodeReview' and details_id={}",
				pull_request.inner.id
			))?;

		Ok(())
	}

	fn find_contributors_of_repo(
		&self,
		github_repo_id: &GithubRepoId,
	) -> Result<Vec<GithubUserId>> {
		let mut connection = self.connection()?;
		let contributors = dsl::contributions
			.select(dsl::user_id)
			.distinct()
			.filter(dsl::repo_id.eq(github_repo_id))
			.load(&mut *connection)
			.err_with_context(format!(
				"select user_id from contributions where repo_id={github_repo_id}"
			))?;
		Ok(contributors)
	}
}
