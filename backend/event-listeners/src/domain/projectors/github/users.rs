use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::SubscriberCallbackError;
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubUser},
	infrastructure::database::GithubUsersRepository,
};

#[derive(new)]
pub struct Projector {
	github_users_repository: GithubUsersRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_users_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event {
			GithubEvent::User(user) => {
				self.github_users_repository.upsert(&user.into())?;
			},
			GithubEvent::Repo(_) | GithubEvent::PullRequest(_) | GithubEvent::Issue(_) => (),
		}
		Ok(())
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
