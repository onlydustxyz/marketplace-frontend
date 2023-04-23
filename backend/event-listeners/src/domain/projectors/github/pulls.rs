use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::SubscriberCallbackError;
use tracing::instrument;

use super::GithubEvent;
use crate::domain::EventListener;

#[derive(new)]
pub struct Projector {}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_pulls_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		Ok(())
	}
}
