use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubFetchRepoService, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubIssue, GithubRepo, GithubUser},
	infrastructure::database::{
		GithubIssuesRepository, GithubReposContributorsRepository, GithubReposRepository,
		GithubUsersRepository,
	},
};

#[derive(new)]
pub struct Projector {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_repository: GithubReposRepository,
	github_issues_repository: GithubIssuesRepository,
	github_users_repository: GithubUsersRepository,
	github_repos_contributors_repository: GithubReposContributorsRepository,
}

impl Projector {
	async fn build_repo(&self, repo: &domain::GithubRepo) -> Result<GithubRepo> {
		let languages = self.github_fetch_service.repo_languages(repo.id()).await?;

		Ok(GithubRepo {
			id: *repo.id(),
			owner: repo.owner().clone(),
			name: repo.name().clone(),
			updated_at: Some(Utc::now().naive_utc()),
			description: repo.description().clone(),
			stars: *repo.stars(),
			fork_count: *repo.forks_count(),
			html_url: repo.html_url().to_string(),
			languages: serde_json::to_value(languages)?,
		})
	}
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event.clone() {
			GithubEvent::Repo(repo) => {
				self.github_repo_repository.upsert(
					&self.build_repo(&repo).await.map_err(SubscriberCallbackError::Discard)?,
				)?;
			},
			GithubEvent::PullRequest(issue) | GithubEvent::Issue(issue) => {
				self.github_issues_repository.upsert(&issue.into())?;
			},
			GithubEvent::User { user, repo_id } => {
				self.github_users_repository.upsert(&user.clone().into())?;
				if let Some(repo_id) = repo_id {
					self.github_repos_contributors_repository.try_insert(&repo_id, user.id())?;
				}
			},
		}
		Ok(())
	}
}

impl From<domain::GithubIssue> for GithubIssue {
	fn from(issue: domain::GithubIssue) -> Self {
		GithubIssue {
			id: issue.id,
			repo_id: issue.repo_id,
			issue_number: issue.number,
			created_at: issue.created_at.naive_utc(),
			author_id: *issue.author.id(),
			merged_at: issue.merged_at.map(|date| date.naive_utc()),
			type_: issue.r#type,
			status: issue.status,
			title: issue.title,
			html_url: issue.html_url.to_string(),
			closed_at: issue.closed_at.map(|date| date.naive_utc()),
		}
	}
}

impl From<domain::GithubUser> for GithubUser {
	fn from(user: domain::GithubUser) -> Self {
		GithubUser::new(
			*user.id(),
			user.login().clone(),
			user.avatar_url().to_string(),
			user.html_url().to_string(),
		)
	}
}
