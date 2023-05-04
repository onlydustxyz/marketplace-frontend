use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::SubscriberCallbackError;
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubUserIndex},
	infrastructure::database::GithubUserIndexRepository,
};

#[derive(new)]
pub struct Projector {
	github_user_index_repository: GithubUserIndexRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_contributors_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event {
			GithubEvent::NewContributor(user_id) => {
				self.github_user_index_repository
					.try_insert(&GithubUserIndex::new(*user_id, None, false))?;
			},
			GithubEvent::User(_)
			| GithubEvent::Repo(_)
			| GithubEvent::PullRequest(_)
			| GithubEvent::Issue(_) => (),
		}
		Ok(())
	}
}
