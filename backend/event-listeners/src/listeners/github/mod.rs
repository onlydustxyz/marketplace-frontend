mod events;

use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::{self, GithubFetchRepoService, Languages, SubscriberCallbackError};
pub use events::Event;
use infrastructure::database::{ImmutableRepository, Repository};
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[allow(clippy::too_many_arguments)]
#[derive(new)]
pub struct Projector {
	github_fetch_service: Arc<dyn GithubFetchRepoService>,
	github_repo_repository: Arc<dyn Repository<GithubRepo>>,
	github_issues_repository: Arc<dyn Repository<GithubIssue>>,
	github_pull_requests_repository: Arc<dyn GithubPullRequestRepository>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	github_users_repository: Arc<dyn Repository<GithubUser>>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	project_github_repos_repository: Arc<dyn ProjectGithubRepoRepository>,
	technologies_repository: Arc<dyn ImmutableRepository<Technology>>,
}

impl Projector {
	fn build_repo(&self, repo: domain::GithubRepo, languages: Languages) -> Result<GithubRepo> {
		Ok(GithubRepo {
			id: repo.id,
			owner: repo.owner,
			name: repo.name,
			updated_at: Some(Utc::now().naive_utc()),
			description: repo.description,
			stars: repo.stars,
			fork_count: repo.forks_count,
			html_url: repo.html_url.to_string(),
			languages: serde_json::to_value(languages)?,
			parent_id: repo.parent.map(|repo| repo.id),
			has_issues: repo.has_issues,
		})
	}

	async fn index_repo(&self, repo: domain::GithubRepo) -> Result<(), SubscriberCallbackError> {
		let languages = self.github_fetch_service.repo_languages(repo.id).await?;
		languages.get_all().into_iter().try_for_each(|language| {
			self.technologies_repository
				.try_insert(Technology {
					technology: language,
				})
				.map(|_| ())
		})?;

		self.github_repo_repository
			.upsert(self.build_repo(repo, languages).map_err(SubscriberCallbackError::Discard)?)?;

		Ok(())
	}
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "github_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		match event.clone() {
			Event::Repo(repo) => {
				if let Some(parent) = repo.parent.clone() {
					self.index_repo(*parent).await?;
				}

				self.index_repo(repo).await?;
			},
			Event::Issue(issue) => {
				let issue: GithubIssue = issue.into();
				self.github_issues_repository.upsert(issue.clone())?;
				self.contributions_repository.upsert_from_github_issue(issue.clone())?;

				self.project_github_repos_repository
					.find_projects_of_repo(&issue.repo_id)?
					.iter()
					.try_for_each(|project_id| {
						self.projects_contributors_repository
							.refresh_project_contributor_list(project_id)
					})?;
			},
			Event::PullRequest(pull_request) => {
				self.github_pull_requests_repository.upsert(pull_request.into())?;
			},
			Event::FullPullRequest(pull_request) => {
				let pull_request: GithubPullRequest = pull_request.into();
				self.github_pull_requests_repository.upsert(pull_request.clone())?;
				self.contributions_repository
					.upsert_from_github_pull_request(pull_request.clone())?;

				self.project_github_repos_repository
					.find_projects_of_repo(&pull_request.inner.repo_id)?
					.iter()
					.try_for_each(|project_id| {
						self.projects_contributors_repository
							.refresh_project_contributor_list(project_id)
					})?;
			},
			Event::User { user, repo_id: _ } => {
				self.github_users_repository.upsert(user.into())?;
			},
			Event::FullUser(user) => {
				self.github_users_repository.upsert(user.into())?;
			},
		}
		Ok(())
	}
}

impl From<domain::GithubUser> for GithubUser {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id,
			login: user.login,
			avatar_url: user.avatar_url.to_string(),
			html_url: user.html_url.to_string(),
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
