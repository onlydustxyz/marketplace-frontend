use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{GithubIssue, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubPull},
	infrastructure::database::GithubPullsRepository,
};

#[derive(new)]
pub struct Projector {
	github_pulls_repository: GithubPullsRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_pulls_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		if let GithubEvent::PullRequest(pull) = event {
			{
				let pull = pull.clone().try_into().map_err(SubscriberCallbackError::Discard)?;
				self.github_pulls_repository.upsert(&pull)?;
			}
		}
		Ok(())
	}
}

impl TryFrom<GithubIssue> for GithubPull {
	type Error = anyhow::Error;

	fn try_from(pull: GithubIssue) -> anyhow::Result<Self> {
		Ok(GithubPull::new(
			*pull.id(),
			*pull.repo_id(),
			(*pull.number() as i64).into(),
			pull.created_at().naive_utc(),
			*pull.author().id(),
			pull.merged_at().map(|date| date.naive_utc()),
		))
	}
}
