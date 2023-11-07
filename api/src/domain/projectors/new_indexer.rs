use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{Event, EventListener, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::domain::services::new_indexer;

#[derive(new, Clone)]
pub struct Projector {
	new_indexer: Arc<dyn new_indexer::Service>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Project(ProjectEvent::GithubRepoLinked { github_repo_id, .. }) = event {
			self.new_indexer
				.index_repo(github_repo_id)
				.await
				.map_err(SubscriberCallbackError::Fatal)?;
		}

		Ok(())
	}
}
