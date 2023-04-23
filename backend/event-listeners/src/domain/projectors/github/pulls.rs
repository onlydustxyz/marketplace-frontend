use anyhow::{anyhow, Result};
use async_trait::async_trait;
use chrono::Utc;
use derive_new::new;
use domain::SubscriberCallbackError;
use octocrab::models::{
	events::payload::{EventPayload, PullRequestEventAction},
	pulls::PullRequest,
};
use tracing::instrument;

use super::GithubEvent;
use crate::{
	domain::{EventListener, GithubMergedPull, GithubPull},
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
		if let Some(EventPayload::PullRequestEvent(payload)) = &event.0.payload {
			match payload.action {
				PullRequestEventAction::Opened | PullRequestEventAction::Reopened =>
					self.on_pull_opened(&payload.pull_request)?,
				PullRequestEventAction::Closed => self.on_pull_closed(&payload.pull_request)?,
				_ => (),
			}
		}
		Ok(())
	}
}

impl Projector {
	fn on_pull_opened(&self, pull: &PullRequest) -> Result<(), SubscriberCallbackError> {
		let pull = pull.try_into().map_err(SubscriberCallbackError::Discard)?;
		self.github_pulls_repository.upsert(&pull)?;
		Ok(())
	}

	fn on_pull_closed(&self, pull: &PullRequest) -> Result<(), SubscriberCallbackError> {
		self.github_pulls_repository
			.update(&pull.id.0.into(), GithubMergedPull::from(pull))?;
		Ok(())
	}
}

impl From<&PullRequest> for GithubMergedPull {
	fn from(pull: &PullRequest) -> Self {
		GithubMergedPull::new(pull.merged_at.map(|date| date.naive_utc()))
	}
}

impl TryFrom<&PullRequest> for GithubPull {
	type Error = anyhow::Error;

	fn try_from(pull: &PullRequest) -> anyhow::Result<Self> {
		let user = pull.user.clone().ok_or_else(|| anyhow!("Pull request without a user"))?;
		let repo = pull.base.repo.clone().ok_or_else(|| anyhow!("Pull request without a repo"))?;

		Ok(GithubPull::new(
			pull.id.0.into(),
			repo.id.0.into(),
			pull.number.into(),
			pull.created_at.unwrap_or_else(Utc::now).naive_utc(),
			user.id.0.into(),
		))
	}
}
