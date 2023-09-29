use std::collections::HashSet;

use diesel::{
	r2d2::{ConnectionManager, PooledConnection},
	Connection, ExpressionMethods, PgConnection, QueryDsl, RunQueryDsl,
};
use domain::GithubCodeReviewId;
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database::{
		enums::{ContributionStatus, ContributionType, GithubCodeReviewStatus, GithubIssueStatus},
		schema::{contributions, github_pull_request_reviews},
	},
	dbclient::{self, DatabaseError, Result},
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

impl Repository for dbclient::Client {
	fn upsert_from_github_issue(&self, issue: GithubIssue) -> Result<()> {
		let contributions: Vec<_> = issue
			.assignee_ids
			.0
			.into_iter()
			.map(|assignee| {
				Contribution::new(
					issue.repo_id,
					assignee,
					ContributionType::Issue,
					issue.id.into(),
					match issue.status {
						GithubIssueStatus::Completed => ContributionStatus::Complete,
						GithubIssueStatus::Open => ContributionStatus::InProgress,
						GithubIssueStatus::Cancelled => ContributionStatus::Canceled,
					},
					issue.created_at,
					issue.closed_at,
				)
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

				diesel::insert_into(contributions::table)
					.values(contributions)
					.on_conflict_do_nothing()
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
	commits: &[Commit],
) -> Result<()> {
	let contributions: Vec<_> = commits
		.iter()
		.map(|commit| {
			Contribution::new(
				pull_request.inner.repo_id,
				commit.author_id,
				ContributionType::PullRequest,
				pull_request.inner.id.into(),
				pull_request.inner.status.into(),
				pull_request.inner.created_at,
				pull_request.inner.closed_at,
			)
		})
		.chain(std::iter::once(Contribution::new(
			pull_request.inner.repo_id,
			pull_request.inner.author_id,
			ContributionType::PullRequest,
			pull_request.inner.id.into(),
			pull_request.inner.status.into(),
			pull_request.inner.created_at,
			pull_request.inner.closed_at,
		)))
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

			diesel::insert_into(contributions::table)
				.values(contributions)
				.on_conflict_do_nothing()
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
	diesel::update(contributions::table)
		.filter(contributions::details_id.eq(DetailsId::from(pull_request.inner.id)))
		.filter(contributions::type_.eq(ContributionType::PullRequest))
		.set((
			contributions::status.eq::<ContributionStatus>(pull_request.inner.status.into()),
			contributions::closed_at.eq(pull_request.inner.closed_at),
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
	reviews: &[Review],
) -> Result<()> {
	let mut contributions = HashSet::with_capacity(reviews.len());

	for review in reviews {
		let contribution = Contribution::new(
			pull_request.inner.repo_id,
			review.reviewer_id,
			ContributionType::CodeReview,
			review
				.id
				.parse::<GithubCodeReviewId>()
				.map_err(DatabaseError::InvalidData)?
				.into(),
			match review.status {
				GithubCodeReviewStatus::Completed => ContributionStatus::Complete,
				GithubCodeReviewStatus::Pending => ContributionStatus::InProgress,
			},
			pull_request.inner.created_at,
			match review.status {
				GithubCodeReviewStatus::Completed => review.submitted_at,
				GithubCodeReviewStatus::Pending => None,
			},
		);

		contributions.insert(contribution);
	}

	let contributions: Vec<_> = contributions.into_iter().collect();

	connection
		.transaction(|connection| {
			let code_review_ids: Vec<String> = github_pull_request_reviews::table
				.select(github_pull_request_reviews::id)
				.filter(github_pull_request_reviews::pull_request_id.eq(pull_request.inner.id))
				.load(&mut *connection)?;

			diesel::delete(
				contributions::table.filter(contributions::details_id.eq_any(code_review_ids)),
			)
			.execute(&mut *connection)?;

			diesel::insert_into(contributions::table)
				.values(contributions)
				.on_conflict_do_nothing()
				.execute(&mut *connection)
		})
		.err_with_context(format!(
			"delete+insert contribution where type='CodeReview' and pull_request_id={}",
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
		contributions::table
			.filter(contributions::details_id.eq(details_id))
			.filter(contributions::type_.eq(type_)),
	)
	.execute(&mut *connection)
}
