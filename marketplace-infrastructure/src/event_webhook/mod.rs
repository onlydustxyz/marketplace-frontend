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
		state.serialize_field("aggregate_type", self.aggregate_name())?;
		state.serialize_field("aggregate_id", &self.aggregate_id())?;
		state.serialize_field("event", &self.event())?;
		state.serialize_field("payload", &self.0)?;
		state.end()
	}
}

pub trait AggregateContext {
	fn aggregate_name(&self) -> &'static str;
	fn aggregate_id(&self) -> String;
	fn event(&self) -> &'static str;
}

impl AggregateContext for WebhookEvent {
	fn aggregate_name(&self) -> &'static str {
		match &self.0 {
			Event::Contribution(_) => "Contribution",
			Event::Project(_) => "Project",
		}
	}

	fn aggregate_id(&self) -> String {
		match &self.0 {
			Event::Contribution(ContributionEvent::Created { id, .. })
			| Event::Contribution(ContributionEvent::Applied { id, .. })
			| Event::Contribution(ContributionEvent::ApplicationRefused { id, .. })
			| Event::Contribution(ContributionEvent::Assigned { id, .. })
			| Event::Contribution(ContributionEvent::Claimed { id, .. })
			| Event::Contribution(ContributionEvent::Unassigned { id })
			| Event::Contribution(ContributionEvent::Validated { id }) => id.to_string(),
			Event::Project(ProjectEvent::LeadContributorAdded { project_id, .. })
			| Event::Project(ProjectEvent::LeadContributorRemoved { project_id, .. })
			| Event::Project(ProjectEvent::MemberAdded { project_id, .. })
			| Event::Project(ProjectEvent::MemberRemoved { project_id, .. }) => project_id.to_string(),
		}
	}

	fn event(&self) -> &'static str {
		match &self.0 {
			Event::Contribution(ContributionEvent::Created { .. }) => "Created",
			Event::Contribution(ContributionEvent::Applied { .. }) => "Applied",
			Event::Contribution(ContributionEvent::ApplicationRefused { .. }) =>
				"ApplicationRefused",
			Event::Contribution(ContributionEvent::Assigned { .. }) => "Assigned",
			Event::Contribution(ContributionEvent::Claimed { .. }) => "Claimed",
			Event::Contribution(ContributionEvent::Unassigned { .. }) => "Unassigned",
			Event::Contribution(ContributionEvent::Validated { .. }) => "Validated",
			Event::Project(ProjectEvent::LeadContributorAdded { .. }) => "LeadContributorAdded",
			Event::Project(ProjectEvent::LeadContributorRemoved { .. }) => "LeadContributorRemoved",
			Event::Project(ProjectEvent::MemberAdded { .. }) => "MemberAdded",
			Event::Project(ProjectEvent::MemberRemoved { .. }) => "MemberRemoved",
		}
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
