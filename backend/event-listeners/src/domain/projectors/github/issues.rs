use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::SubscriberCallbackError;
use tracing::instrument;

use crate::{
	domain::{EventListener, GithubEvent, GithubIssue},
	infrastructure::database::GithubIssuesRepository,
};

#[derive(new)]
pub struct Projector {
	github_issues_repository: GithubIssuesRepository,
}

#[async_trait]
impl EventListener<GithubEvent> for Projector {
	#[instrument(name = "github_issues_projection", skip(self))]
	async fn on_event(&self, event: &GithubEvent) -> Result<(), SubscriberCallbackError> {
		match event {
			GithubEvent::PullRequest(issue) | GithubEvent::Issue(issue) => {
				let issue = issue.clone().try_into().map_err(SubscriberCallbackError::Discard)?;
				self.github_issues_repository.upsert(&issue)?;
			},
			GithubEvent::Repo(_) => (),
		}
		Ok(())
	}
}

impl TryFrom<domain::GithubIssue> for GithubIssue {
	type Error = anyhow::Error;

	fn try_from(issue: domain::GithubIssue) -> anyhow::Result<Self> {
		Ok(GithubIssue::new(
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
		))
	}
}
