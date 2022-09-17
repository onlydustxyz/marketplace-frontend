#[cfg(test)]
mod tests;

use std::env;

use async_trait::async_trait;
use log::{error, info};
use marketplace_domain::{ContributionEvent, Event, EventListener, ProjectEvent};
use serde::{ser::SerializeStruct, Serialize};
use url::Url;

const WEBHOOK_TARGET_ENV_VAR: &str = "EVENT_WEBHOOK_TARGET";

pub struct WebhookEvent(Event);

impl WebhookEvent {
	pub fn new(event: Event) -> Self {
		Self(event)
	}
}

impl Serialize for WebhookEvent {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: serde::Serializer,
	{
		let mut state = serializer.serialize_struct("Event", 4)?;
		match &self.0 {
			Event::Contribution(contribution_event) => {
				state.serialize_field("aggregate_type", "Contribution")?;
				state.serialize_field("payload", contribution_event)?;

				match contribution_event {
					ContributionEvent::Created { id, .. } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "Created")?;
					},
					ContributionEvent::Applied { id, .. } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "applied")?;
					},
					ContributionEvent::ApplicationRefused { id, .. } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "ApplicationRefused")?;
					},
					ContributionEvent::Assigned { id, .. } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "Assigned")?;
					},
					ContributionEvent::Claimed { id, .. } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "Claimed")?;
					},
					ContributionEvent::Unassigned { id } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "Unassigned")?;
					},
					ContributionEvent::Validated { id } => {
						state.serialize_field("aggregate_id", id)?;
						state.serialize_field("event", "Validated")?;
					},
				}
			},
			Event::Project(project_event) => {
				state.serialize_field("aggregate_type", "Project")?;
				state.serialize_field("payload", project_event)?;

				match project_event {
					ProjectEvent::LeadContributorAdded { project_id, .. } => {
						state.serialize_field("aggregate_id", project_id)?;
						state.serialize_field("event", "LeadContributorAdded")?;
					},
					ProjectEvent::LeadContributorRemoved { project_id, .. } => {
						state.serialize_field("aggregate_id", project_id)?;
						state.serialize_field("event", "LeadContributorRemoved")?;
					},
					ProjectEvent::MemberAdded { project_id, .. } => {
						state.serialize_field("aggregate_id", project_id)?;
						state.serialize_field("event", "MemberAdded")?;
					},
					ProjectEvent::MemberRemoved { project_id, .. } => {
						state.serialize_field("aggregate_id", project_id)?;
						state.serialize_field("event", "MemberRemoved")?;
					},
				}
			},
		}
		state.end()
	}
}

pub struct EventWebHook {
	web_client: reqwest::Client,
}

impl EventWebHook {
	pub fn new(client: reqwest::Client) -> Self {
		Self { web_client: client }
	}
}

#[derive(Debug)]
enum Error {
	EnvVarNotSet(env::VarError),
	InvalidEnvVar(url::ParseError),
	FailToSendRequest(reqwest::Error),
	RespondWithErrorStatusCode(reqwest::Error),
}

#[async_trait]
impl EventListener for EventWebHook {
	async fn on_event(&self, event: &Event) {
		match send_event_to_webhook(&self.web_client, event).await {
			Ok(()) => {},
			Err(e) => match e {
				Error::EnvVarNotSet(_) => info!(
					"Event webhook ignored: environment variable '{WEBHOOK_TARGET_ENV_VAR}' is not set"
				),
				Error::InvalidEnvVar(e) => error!(
					"Failed to parse environment variable '{WEBHOOK_TARGET_ENV_VAR}' content to Url: {e}"
				),
				Error::FailToSendRequest(e) => error!("Failed to send event to hook target: {e}"),
				Error::RespondWithErrorStatusCode(e) =>
					error!("WebHook target failed to process event: {e}"),
			},
		}
	}
}

async fn send_event_to_webhook(client: &reqwest::Client, event: &Event) -> Result<(), Error> {
	let env_var = std::env::var(WEBHOOK_TARGET_ENV_VAR).map_err(Error::EnvVarNotSet)?;
	let target = Url::parse(&env_var).map_err(Error::InvalidEnvVar)?;
	let res = client
		.post(target.clone())
		.json(&WebhookEvent::new(event.clone()))
		.send()
		.await
		.map_err(Error::FailToSendRequest)?;
	res.error_for_status().map_err(Error::RespondWithErrorStatusCode)?;

	Ok(())
}
