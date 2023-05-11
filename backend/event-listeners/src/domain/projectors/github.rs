use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubRepo, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{CrmGithubRepo, EventListener, GithubEvent, GithubIssue, GithubUser},
	infrastructure::database::{
		CrmGithubRepoRepository, GithubIssuesRepository, GithubReposContributorsRepository,
		GithubUsersRepository,
	},
};

#[derive(new)]
pub struct Projector {
	crm_github_repo_repository: CrmGithubRepoRepository,
	github_issues_repository: GithubIssuesRepository,
	github_users_repository: GithubUsersRepository,
	github_repos_contributors_repository: GithubReposContributorsRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event {
			GithubEvent::Repo(repo) => {
				self.crm_github_repo_repository.upsert(&repo.into())?;
				repo.contributors().into_iter().try_for_each(|contributor| {
					self.github_repos_contributors_repository
						.try_insert(repo.id(), contributor.id())
				})?;
			},
			GithubEvent::PullRequest(issue) | GithubEvent::Issue(issue) => {
				self.github_issues_repository.upsert(&issue.into())?;
			},
			GithubEvent::User(user) => {
				self.github_users_repository.upsert(&user.into())?;
			},
		}
		Ok(())
	}
}

impl From<&GithubRepo> for CrmGithubRepo {
	fn from(repo: &GithubRepo) -> Self {
		Self::new(
			*repo.id(),
			repo.owner().clone(),
			repo.name().clone(),
			Some(Utc::now().naive_utc()),
		)
	}
}

impl From<&domain::GithubIssue> for GithubIssue {
	fn from(issue: &domain::GithubIssue) -> Self {
		GithubIssue::new(
			*issue.id(),
			*issue.repo_id(),
			(*issue.number() as i64).into(),
			issue.created_at().naive_utc(),
			*issue.author().id(),
			issue.merged_at().map(|date| date.naive_utc()),
			*issue.r#type(),
			*issue.status(),
			issue.title().clone(),
			issue.html_url().to_string(),
			issue.closed_at().map(|date| date.naive_utc()),
		)
	}
}

impl From<&domain::GithubUser> for GithubUser {
	fn from(user: &domain::GithubUser) -> Self {
		GithubUser::new(
			*user.id(),
			user.login().clone(),
			user.avatar_url().to_string(),
			user.html_url().to_string(),
		)
	}
}
