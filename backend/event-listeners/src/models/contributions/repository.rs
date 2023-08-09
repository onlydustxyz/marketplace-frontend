use std::collections::HashSet;

use diesel::{Connection, ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl};
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
		let contributions: Vec<_> = issue
			.assignee_ids
			.0
			.into_iter()
			.map(|assignee| Contribution {
				repo_id: issue.repo_id,
				user_id: assignee,
				type_: ContributionType::Issue,
				details_id: issue.id.into(),
			})
			.collect();

		let mut connection = self.connection()?;

		connection
			.transaction(|connection| {
				delete_all_contributions_for_details(
					connection,
					DetailsId::from(issue.id),
					ContributionType::Issue,
				)?;

				diesel::insert_into(dsl::contributions)
					.values(contributions)
					.execute(&mut *connection)
			})
			.err_with_context(format!(
				"delete+insert contribution where type='Issue' and details_id={}",
				issue.id
			))?;

		Ok(())
	}

	fn upsert_from_github_pull_request(&self, pull_request: GithubPullRequest) -> Result<()> {
		let mut connection = self.connection()?;

		if let Some(commits) = pull_request.commits {
			let contributions: Vec<_> = commits
				.into_iter()
				.map(|commit| Contribution {
					repo_id: pull_request.inner.repo_id,
					user_id: commit.author_id,
					type_: ContributionType::PullRequest,
					details_id: pull_request.inner.id.into(),
				})
				.collect::<HashSet<_>>()
				.into_iter()
				.collect();

			connection
				.transaction(|connection| {
					delete_all_contributions_for_details(
						connection,
						DetailsId::from(pull_request.inner.id),
						ContributionType::PullRequest,
					)?;

					diesel::insert_into(dsl::contributions)
						.values(contributions)
						.execute(&mut *connection)
				})
				.err_with_context(format!(
					"delete+insert contribution where type='PullRequest' and details_id={}",
					pull_request.inner.id
				))?;
		}

		if let Some(reviews) = pull_request.reviews {
			let contributions: Vec<_> = reviews
				.into_iter()
				.map(|review| Contribution {
					repo_id: pull_request.inner.repo_id,
					user_id: review.reviewer_id,
					type_: ContributionType::CodeReview,
					details_id: pull_request.inner.id.into(),
				})
				.collect::<HashSet<_>>()
				.into_iter()
				.collect();

			connection
				.transaction(|connection| {
					delete_all_contributions_for_details(
						connection,
						DetailsId::from(pull_request.inner.id),
						ContributionType::CodeReview,
					)?;

					diesel::insert_into(dsl::contributions)
						.values(contributions)
						.execute(&mut *connection)
				})
				.err_with_context(format!(
					"delete+insert contribution where type='CodeReview' and details_id={}",
					pull_request.inner.id
				))?;
		}

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

fn delete_all_contributions_for_details(
	connection: &mut PgConnection,
	details_id: DetailsId,
	type_: ContributionType,
) -> diesel::result::QueryResult<usize> {
	diesel::delete(
		dsl::contributions
			.filter(dsl::details_id.eq(details_id))
			.filter(dsl::type_.eq(type_)),
	)
	.execute(&mut *connection)
}
