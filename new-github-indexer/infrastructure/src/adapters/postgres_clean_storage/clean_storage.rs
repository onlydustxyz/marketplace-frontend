use diesel::{Connection, ExpressionMethods, PgConnection};
use domain::{
	models::*,
	ports::output::clean_storage::{self, Port},
};
use infrastructure::dbclient::{self, ImmutableModel, Model};

use super::{
	models,
	schema::indexer_clean::{pull_request_closing_issues, pull_request_commits},
};
use crate::adapters::postgres_clean_storage::Result;

pub struct PostgresCleanStorageAdapter {
	pub postgres_client: dbclient::Client,
}

impl PostgresCleanStorageAdapter {
	fn save_indexed_user(&self, connection: &mut PgConnection, user: indexed::User) -> Result<()> {
		let user_id = user.inner.id;

		models::User::try_from(user.inner)?.upsert(connection)?;
		models::UserSocialAccounts::try_from((user_id, user.social_accounts))?
			.upsert(connection)?;
		Ok(())
	}

	fn save_indexed_issue(
		&self,
		connection: &mut PgConnection,
		repo_id: RepositoryId,
		issue: indexed::Issue,
	) -> Result<()> {
		models::Issue::try_from((repo_id, issue.inner))?.upsert(connection)?;

		issue
			.assignees
			.into_iter()
			.try_for_each(|assignee| self.save_indexed_user(connection, assignee))?;

		Ok(())
	}

	fn save_pull_request_indexed_commits(
		&self,
		connection: &mut PgConnection,
		repo_id: RepositoryId,
		pull_request_id: PullRequestId,
		commits: Vec<indexed::Commit>,
	) -> Result<()> {
		commits
			.iter()
			.try_for_each(|commit| self.save_indexed_user(connection, commit.author.clone()))?;

		let commits: Vec<_> = commits
			.into_iter()
			.map(|commit| {
				models::PullRequestCommit::try_from((repo_id, pull_request_id, commit.inner))
			})
			.collect::<Result<_>>()?;

		models::PullRequestCommit::delete_all(
			connection,
			pull_request_commits::pull_request_id.eq(pull_request_id.0 as i64),
		)?;
		models::PullRequestCommit::insert_all(connection, commits)?;
		Ok(())
	}

	fn save_pull_request_indexed_reviews(
		&self,
		connection: &mut PgConnection,
		pull_request_id: PullRequestId,
		reviews: Vec<indexed::Review>,
	) -> Result<()> {
		reviews
			.iter()
			.try_for_each(|review| self.save_indexed_user(connection, review.author.clone()))?;

		let reviews: Vec<_> = reviews
			.into_iter()
			.map(|review| models::PullRequestReview::try_from((pull_request_id, review.inner)))
			.collect::<Result<_>>()?;

		models::PullRequestReview::upsert_all(connection, reviews)?;
		Ok(())
	}

	fn save_pull_request_closing_issues(
		&self,
		connection: &mut PgConnection,
		pull_request_id: PullRequestId,
		issue_ids: Vec<IssueId>,
	) -> Result<()> {
		let closing_issues = issue_ids
			.into_iter()
			.map(|issue_id| models::PullRequestClosingIssue::try_from((pull_request_id, issue_id)))
			.collect::<Result<_>>()?;

		models::PullRequestClosingIssue::delete_all(
			connection,
			pull_request_closing_issues::pull_request_id.eq(pull_request_id.0 as i64),
		)?;
		models::PullRequestClosingIssue::insert_all(connection, closing_issues)?;

		Ok(())
	}

	fn save_indexed_pull_request(
		&self,
		connection: &mut PgConnection,
		repo_id: RepositoryId,
		pull_request: indexed::PullRequest,
	) -> Result<()> {
		let pull_request_id = pull_request.inner.id;
		let head_repo_id = pull_request
			.inner
			.head
			.repo
			.as_ref()
			.ok_or(super::Error::MissingField("head repo"))?
			.id;
		let head_sha = pull_request.inner.head.sha.clone();

		models::PullRequest::try_from((repo_id, pull_request.inner))?.upsert(connection)?;

		self.save_pull_request_indexed_commits(
			connection,
			repo_id,
			pull_request_id,
			pull_request.commits,
		)?;

		self.save_pull_request_closing_issues(
			connection,
			pull_request_id,
			pull_request.closing_issue_ids,
		)?;

		models::RepoCheckRuns::try_from((head_repo_id, head_sha, pull_request.check_runs))?
			.upsert(connection)?;

		self.save_pull_request_indexed_reviews(connection, pull_request_id, pull_request.reviews)?;

		Ok(())
	}

	fn save_indexed_repo(
		&self,
		connection: &mut PgConnection,
		repo: indexed::Repository,
	) -> Result<()> {
		let repo_id = repo.inner.id;

		models::Repo::try_from(repo.inner)?.upsert(connection)?;
		models::RepoLanguages::try_from((repo_id, repo.languages))?.upsert(connection)?;

		repo.issues
			.into_iter()
			.try_for_each(|issue| self.save_indexed_issue(connection, repo_id, issue))?;

		repo.pull_requests.into_iter().try_for_each(|pull_request| {
			self.save_indexed_pull_request(connection, repo_id, pull_request)
		})?;

		Ok(())
	}
}

impl Port for PostgresCleanStorageAdapter {
	fn save_repo(&self, repo: indexed::Repository) -> clean_storage::Result<()> {
		self.postgres_client
			.connection()
			.map_err(|e| clean_storage::Error::Connection(e.into()))?
			.transaction(|connection| self.save_indexed_repo(connection, repo))?;

		Ok(())
	}

	fn save_issue(&self, repo: Repository, issue: indexed::Issue) -> clean_storage::Result<()> {
		self.postgres_client
			.connection()
			.map_err(|e| clean_storage::Error::Connection(e.into()))?
			.transaction(|connection| {
				self.save_indexed_issue(connection, repo.id, issue)?;
				models::Repo::try_from(repo)?.upsert(connection)?;
				Result::Ok(())
			})?;

		Ok(())
	}

	fn save_pull_request(
		&self,
		repo: Repository,
		pull_request: indexed::PullRequest,
	) -> clean_storage::Result<()> {
		self.postgres_client
			.connection()
			.map_err(|e| clean_storage::Error::Connection(e.into()))?
			.transaction(|connection| {
				self.save_indexed_pull_request(connection, repo.id, pull_request)?;
				models::Repo::try_from(repo)?.upsert(connection)?;
				Result::Ok(())
			})?;

		Ok(())
	}

	fn save_user(&self, user: indexed::User) -> clean_storage::Result<()> {
		self.postgres_client
			.connection()
			.map_err(|e| clean_storage::Error::Connection(e.into()))?
			.transaction(|connection| self.save_indexed_user(connection, user))?;

		Ok(())
	}
}
