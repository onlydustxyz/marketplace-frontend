use std::collections::HashSet;

use diesel::{
	r2d2::{ConnectionManager, PooledConnection},
	Connection, ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl,
};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{
		enums::{ContributionStatus, ContributionType, GithubCodeReviewStatus, GithubIssueStatus},
		schema::contributions::dsl,
		Result,
	},
};

use super::{Contribution, DetailsId};
use crate::models::{
	github_pull_requests::{Commit, Review},
	GithubIssue, GithubPullRequest,
};

pub trait Repository: Sync + Send {
	fn upsert_from_github_issue(&self, issue: GithubIssue) -> Result<()>;
	fn upsert_from_github_pull_request(&self, pull_request: GithubPullRequest) -> Result<()>;
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
				status: match issue.status {
					GithubIssueStatus::Completed => ContributionStatus::Complete,
					GithubIssueStatus::Open => ContributionStatus::InProgress,
					GithubIssueStatus::Cancelled => ContributionStatus::Canceled,
				},
				created_at: issue.created_at,
				closed_at: issue.closed_at,
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

		if let Some(commits) = pull_request.clone().commits {
			refresh_contributions_from_commits(&mut connection, &pull_request, &commits)?;
		} else {
			update_contributions_status(&mut connection, &pull_request)?;
		}

		if let Some(reviews) = pull_request.clone().reviews {
			refresh_contributions_from_reviews(&mut connection, &pull_request, &reviews)?;
		}

		Ok(())
	}
}

fn refresh_contributions_from_commits(
	connection: &mut PooledConnection<ConnectionManager<PgConnection>>,
	pull_request: &GithubPullRequest,
	commits: &Vec<Commit>,
) -> Result<()> {
	let contributions: Vec<_> = commits
		.into_iter()
		.map(|commit| Contribution {
			repo_id: pull_request.inner.repo_id,
			user_id: commit.author_id,
			type_: ContributionType::PullRequest,
			details_id: pull_request.inner.id.into(),
			status: pull_request.inner.status.into(),
			created_at: pull_request.inner.created_at,
			closed_at: pull_request.inner.closed_at,
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
	Ok(())
}

fn update_contributions_status(
	connection: &mut PooledConnection<ConnectionManager<PgConnection>>,
	pull_request: &GithubPullRequest,
) -> Result<()> {
	diesel::update(dsl::contributions)
		.filter(dsl::details_id.eq(DetailsId::from(pull_request.inner.id)))
		.filter(dsl::type_.eq(ContributionType::PullRequest))
		.set((
			dsl::status.eq::<ContributionStatus>(pull_request.inner.status.into()),
			dsl::closed_at.eq(pull_request.inner.closed_at),
		))
		.execute(&mut *connection)
		.err_with_context(format!(
			"update contribution where type='PullRequest' and details_id={}",
			pull_request.inner.id
		))?;
	Ok(())
}

fn refresh_contributions_from_reviews(
	connection: &mut PooledConnection<ConnectionManager<PgConnection>>,
	pull_request: &GithubPullRequest,
	reviews: &Vec<Review>,
) -> Result<()> {
	let contributions: Vec<_> = reviews
		.into_iter()
		.map(|review| Contribution {
			repo_id: pull_request.inner.repo_id,
			user_id: review.reviewer_id,
			type_: ContributionType::CodeReview,
			details_id: pull_request.inner.id.into(),
			status: match review.status {
				GithubCodeReviewStatus::Completed => ContributionStatus::Complete,
				GithubCodeReviewStatus::Pending => ContributionStatus::InProgress,
			},
			created_at: pull_request.inner.created_at,
			closed_at: review.submitted_at,
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
	Ok(())
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
