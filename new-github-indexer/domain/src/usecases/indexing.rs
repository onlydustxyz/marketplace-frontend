use std::sync::Arc;

use derive_new::new;

use crate::{
	models::{indexed, RepositoryId, UserId},
	ports::{
		input::indexing_facade,
		output::{clean_storage, raw_storage},
	},
};

#[derive(new)]
pub struct Usecase {
	raw_storage: Arc<dyn raw_storage::Port>,
	clean_storage: Arc<dyn clean_storage::Port>,
}

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	RawStorage(#[from] raw_storage::Error),
	#[error(transparent)]
	CleanStorage(#[from] clean_storage::Error),
	#[error("Missing mandatory field: {0}")]
	MissingField(&'static str),
}

type Result<T, E = Error> = std::result::Result<T, E>;

impl Usecase {
	async fn read_user(&self, user_id: UserId) -> Result<indexed::User> {
		let user = self.raw_storage.user_by_id(user_id).await?;
		let social_accounts = self.raw_storage.user_social_accounts_by_id(user_id).await?;
		Ok(indexed::User {
			inner: user,
			social_accounts,
		})
	}

	async fn read_issue(&self, repo_id: RepositoryId, issue_number: u64) -> Result<indexed::Issue> {
		let issue = self.raw_storage.issue_by_repo_id(repo_id, issue_number).await?;

		let mut assignees = vec![];
		for assignee in &issue.assignees {
			assignees.push(self.read_user(assignee.id).await?);
		}

		Ok(indexed::Issue {
			inner: issue,
			assignees,
		})
	}

	async fn read_pull_request(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<indexed::PullRequest> {
		let pull_request =
			self.raw_storage.pull_request_by_repo_id(repo_id, pull_request_number).await?;

		let base_repo = pull_request.base.repo.as_ref().ok_or(Error::MissingField("base repo"))?;
		let base_repo_name = base_repo.name.clone();
		let base_repo_owner =
			base_repo.owner.as_ref().ok_or(Error::MissingField("base repo owner"))?.clone();

		let head_sha = pull_request.head.sha.clone();
		let head_repo_id =
			pull_request.head.repo.as_ref().ok_or(Error::MissingField("head repo"))?.id;

		let mut commits = vec![];
		for commit in self
			.raw_storage
			.pull_request_commits_by_repo_id(repo_id, pull_request_number)
			.await?
		{
			if let Some(author) = commit.author.as_ref().or(commit.committer.as_ref()) {
				let author = self.read_user(author.id).await?;
				commits.push(indexed::Commit {
					author,
					inner: commit,
				})
			}
		}

		let mut reviews = vec![];
		for review in self
			.raw_storage
			.pull_request_reviews_by_repo_id(repo_id, pull_request_number)
			.await?
		{
			if let Some(author) = &review.user {
				let author = self.read_user(author.id).await?;
				reviews.push(indexed::Review {
					author,
					inner: review,
				});
			}
		}

		Ok(indexed::PullRequest {
			inner: pull_request,
			commits,
			check_runs: self
				.raw_storage
				.commit_check_runs_by_repo_id(head_repo_id, head_sha)
				.await?,
			reviews,
			closing_issue_ids: self
				.raw_storage
				.closing_issues_by_repo_owner_name(
					base_repo_owner.login,
					base_repo_name,
					pull_request_number,
				)
				.await?,
		})
	}
}

#[async_trait]
impl indexing_facade::Port for Usecase {
	async fn index_user(&self, user_id: UserId) -> indexing_facade::Result<()> {
		let user = self.read_user(user_id).await?;
		self.clean_storage.save_user(user)?;

		//TODO: expose data in the exposition storage
		Ok(())
	}

	async fn index_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: u64,
	) -> indexing_facade::Result<()> {
		let repo = self.raw_storage.repo_by_owner_name(repo_owner, repo_name).await?;
		let issue = self.read_issue(repo.id, issue_number).await?;

		self.clean_storage.save_issue(repo, issue)?;

		//TODO: expose data in the exposition storage
		Ok(())
	}

	async fn index_pull_request(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: u64,
	) -> indexing_facade::Result<()> {
		let repo = self.raw_storage.repo_by_owner_name(repo_owner, repo_name).await?;
		let pull_request = self.read_pull_request(repo.id, pull_request_number).await?;

		self.clean_storage.save_pull_request(repo, pull_request)?;

		//TODO: expose data in the exposition storage
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use clean_storage::MockPort as CleanStoragePort;
	use mockall::predicate::*;
	use raw_storage::MockPort as RawStoragePort;
	use rstest::*;

	use super::*;
	use crate::{ports::input::indexing_facade::Port, usecases::fixtures::*};

	#[rstest]
	async fn index_single_user() {
		let mut raw_storage = RawStoragePort::new();
		let mut clean_storage = CleanStoragePort::new();

		raw_storage
			.expect_user_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(users::anthony()));

		raw_storage
			.expect_user_social_accounts_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(user_social_accounts::anthony()));

		clean_storage
			.expect_save_user()
			.once()
			.with(eq(indexed::User {
				inner: users::anthony(),
				social_accounts: user_social_accounts::anthony(),
			}))
			.return_once(|_| Ok(()));

		Usecase::new(Arc::new(raw_storage), Arc::new(clean_storage))
			.index_user(users::anthony().id)
			.await
			.unwrap();
	}

	#[rstest]
	async fn index_single_issue() {
		let mut raw_storage = RawStoragePort::new();
		let mut clean_storage = CleanStoragePort::new();

		raw_storage
			.expect_repo_by_owner_name()
			.once()
			.with(
				eq("onlydustxyz".to_string()),
				eq("marketplace-frontend".to_string()),
			)
			.return_once(|_, _| Ok(repos::marketplace_frontend()));

		raw_storage
			.expect_issue_by_repo_id()
			.once()
			.with(eq(repos::marketplace_frontend().id), eq(78))
			.return_once(|_, _| Ok(issues::x78()));

		raw_storage
			.expect_user_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(users::anthony()));

		raw_storage
			.expect_user_social_accounts_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(user_social_accounts::anthony()));

		clean_storage
			.expect_save_issue()
			.once()
			.with(
				eq(repos::marketplace_frontend()),
				eq(indexed::Issue {
					inner: issues::x78(),
					assignees: vec![indexed::User {
						inner: users::anthony(),
						social_accounts: user_social_accounts::anthony(),
					}],
				}),
			)
			.return_once(|_, _| Ok(()));

		Usecase::new(Arc::new(raw_storage), Arc::new(clean_storage))
			.index_issue(
				"onlydustxyz".to_string(),
				"marketplace-frontend".to_string(),
				78,
			)
			.await
			.unwrap();
	}

	#[rstest]
	async fn index_single_pull_request() {
		let mut raw_storage = RawStoragePort::new();
		let mut clean_storage = CleanStoragePort::new();

		raw_storage
			.expect_repo_by_owner_name()
			.once()
			.with(
				eq("onlydustxyz".to_string()),
				eq("marketplace-frontend".to_string()),
			)
			.return_once(|_, _| Ok(repos::marketplace_frontend()));

		raw_storage
			.expect_pull_request_by_repo_id()
			.once()
			.with(eq(repos::marketplace_frontend().id), eq(1257))
			.return_once(|_, _| Ok(pull_requests::x1257()));

		raw_storage
			.expect_user_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(users::anthony()));

		raw_storage
			.expect_user_social_accounts_by_id()
			.once()
			.with(eq(users::anthony().id))
			.return_once(|_| Ok(user_social_accounts::anthony()));

		raw_storage
			.expect_pull_request_reviews_by_repo_id()
			.once()
			.with(eq(repos::marketplace_frontend().id), eq(1257))
			.return_once(|_, _| Ok(vec![reviews::approved_from_pierre()]));

		raw_storage
			.expect_user_by_id()
			.once()
			.with(eq(users::pierre().id))
			.return_once(|_| Ok(users::pierre()));

		raw_storage
			.expect_user_social_accounts_by_id()
			.once()
			.with(eq(users::pierre().id))
			.return_once(|_| Ok(user_social_accounts::pierre()));

		raw_storage
			.expect_closing_issues_by_repo_owner_name()
			.once()
			.with(
				eq("onlydustxyz".to_string()),
				eq("marketplace-frontend".to_string()),
				eq(1257),
			)
			.return_once(|_, _, _| Ok(vec![issues::x78().id]));

		raw_storage
			.expect_commit_check_runs_by_repo_id()
			.once()
			.with(
				eq(repos::marketplace_frontend().id),
				eq(pull_requests::x1257().head.sha),
			)
			.return_once(|_, _| Ok(check_runs::x1257()));

		raw_storage
			.expect_pull_request_commits_by_repo_id()
			.once()
			.with(eq(repos::marketplace_frontend().id), eq(1257))
			.return_once(|_, _| Ok(vec![commits::x1257()]));

		clean_storage
			.expect_save_pull_request()
			.once()
			.with(
				eq(repos::marketplace_frontend()),
				eq(indexed::PullRequest {
					inner: pull_requests::x1257(),
					reviews: vec![reviews::indexed_approved_from_pierre()],
					commits: vec![commits::indexed_1257()],
					closing_issue_ids: vec![issues::x78().id],
					check_runs: check_runs::x1257(),
				}),
			)
			.return_once(|_, _| Ok(()));

		Usecase::new(Arc::new(raw_storage), Arc::new(clean_storage))
			.index_pull_request(
				"onlydustxyz".to_string(),
				"marketplace-frontend".to_string(),
				1257,
			)
			.await
			.unwrap();
	}
}
