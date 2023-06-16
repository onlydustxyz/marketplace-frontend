use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{GithubFetchRepoService, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubRepo, GithubUser},
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
	async fn on_event(&self, event: GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event.clone() {
			GithubEvent::Repo(repo) => {
				self.github_repo_repository.upsert(
					&self.build_repo(&repo).await.map_err(SubscriberCallbackError::Discard)?,
				)?;
			},
			GithubEvent::Issue(issue) => {
				self.github_issues_repository.upsert(&issue.into())?;
			},
			GithubEvent::User { user, repo_id } => {
				self.github_users_repository.upsert(&user.clone().into())?;
				self.github_repos_contributors_repository.try_insert(&repo_id, user.id())?;
			},
			GithubEvent::FullUser(user) => {
				self.github_users_repository.upsert(&user.into())?;
			},
		}
		Ok(())
	}
}

impl From<domain::GithubUser> for GithubUser {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: *user.id(),
			login: user.login().clone(),
			avatar_url: user.avatar_url().to_string(),
			html_url: user.html_url().to_string(),
			..Default::default()
		}
	}
}

impl From<domain::GithubFullUser> for GithubUser {
	fn from(user: domain::GithubFullUser) -> Self {
		Self {
			id: user.id,
			login: user.login.clone(),
			avatar_url: user.avatar_url.to_string(),
			html_url: user.html_url.to_string(),
			bio: user.bio.clone(),
			location: user.location.clone(),
			website: user.blog.as_ref().map(|url| url.to_string()),
			twitter: user.get_social_account_url("twitter"),
			linkedin: user.get_social_account_url("linkedin"),
			telegram: user
				.social_accounts
				.iter()
				.find(|social_account| {
					social_account.url.starts_with("https://t.me")
						|| social_account.url.starts_with("https://telegram.me")
				})
				.map(|social_account| social_account.url.clone()),
		}
	}
}
#[cfg(test)]
mod test {
	use domain::GithubUserSocialAccount;
	use rstest::rstest;

	use super::*;

	fn full_user(social_accounts: Vec<GithubUserSocialAccount>) -> domain::GithubFullUser {
		domain::GithubFullUser {
			id: 1u64.into(),
			login: "ofuxet".to_string(),
			avatar_url: "https://avatars.githubusercontent.com/u/70494?v=4".parse().unwrap(),
			html_url: "https://github.com/ofuxet".parse().unwrap(),
			bio: None,
			location: None,
			blog: None,
			social_accounts,
		}
	}

	fn user(
		twitter: Option<String>,
		linkedin: Option<String>,
		telegram: Option<String>,
	) -> GithubUser {
		GithubUser {
			id: 1u64.into(),
			login: "ofuxet".to_string(),
			avatar_url: "https://avatars.githubusercontent.com/u/70494?v=4".to_string(),
			html_url: "https://github.com/ofuxet".to_string(),
			bio: None,
			location: None,
			website: None,
			twitter,
			linkedin,
			telegram,
		}
	}

	#[rstest]
	#[case(full_user(vec![]), user(None, None, None))]
	#[case(full_user(vec![
		GithubUserSocialAccount{ provider:"twitter".to_string(), url:"https://twitter.com/ofuxet".parse().unwrap()},
		GithubUserSocialAccount{ provider:"linkedin".to_string(), url:"https://linkedin.com/ofuxet".parse().unwrap()},
		GithubUserSocialAccount{ provider:"generic".to_string(), url:"https://t.me/ofuxet".parse().unwrap()}
		]), user(Some("https://twitter.com/ofuxet".to_string()), Some("https://linkedin.com/ofuxet".to_string()), Some("https://t.me/ofuxet".to_string())))]
	fn from_full_user(#[case] input: domain::GithubFullUser, #[case] expected: GithubUser) {
		assert_eq!(GithubUser::from(input), expected)
	}
}
