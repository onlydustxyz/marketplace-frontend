use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{Event, SubscriberCallbackError};
use olog::error;
use tracing::instrument;
use url::Url;

use crate::domain::EventListener;

mod event;
use event::Event as WebHookEvent;

#[derive(new)]
pub struct EventWebHook {
	client: reqwest::Client,
	target_url: Url,
}

impl EventWebHook {
	#[instrument(skip(self))]
	async fn send(&self, event: Event) -> Result<(), Error> {
		let res = self
			.client
			.post(self.target_url.clone())
			.json(&WebHookEvent(event.to_owned()))
			.send()
			.await
			.map_err(Error::FailToSendRequest)?;

		res.error_for_status().map_err(Error::RespondWithErrorStatusCode)?;

		Ok(())
	}
}

#[derive(Debug)]
enum Error {
	FailToSendRequest(reqwest::Error),
	RespondWithErrorStatusCode(reqwest::Error),
}

#[async_trait]
impl EventListener<Event> for EventWebHook {
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		match self.send(event).await {
			Ok(()) => {},
			Err(e) => match e {
				Error::FailToSendRequest(e) => error!("Failed to send event to hook target: {e}"),
				Error::RespondWithErrorStatusCode(e) => {
					error!("WebHook target failed to process event: {e}")
				},
			},
		};
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use std::ffi::OsString;

	use assert_matches::assert_matches;
	use domain::{ProjectEvent, ProjectId};
	use envtestkit::set_env;
	use mockito;
	use rstest::*;
	use serde_json::json;

	use super::*;

	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		uuid::Uuid::new_v4().into()
	}

	#[fixture]
	fn project_created_event(project_id: &ProjectId) -> ProjectEvent {
		ProjectEvent::Created { id: *project_id }
	}

	#[fixture]
	fn target_url() -> Url {
		format!("{}/webhook", mockito::server_url()).parse().unwrap()
	}

	#[rstest]
	#[tokio::test]
	async fn http_call_fail(project_created_event: ProjectEvent) {
		let _m = mockito::mock("POST", "/webhook").with_status(400).expect(1).create();

		let webhook = EventWebHook::new(
			reqwest::Client::new(),
			format!("{}/webhook", mockito::server_url()).parse().unwrap(),
		);

		let event: Event = project_created_event.into();

		assert_matches!(
			webhook.send(event).await,
			Err(Error::RespondWithErrorStatusCode(_))
		);

		assert!(_m.matched());
	}

	#[rstest]
	fn webhook_event_serialize(project_created_event: ProjectEvent, project_id: &ProjectId) {
		let _test = set_env(OsString::from("ENV"), "local");

		let event: domain::Event = project_created_event.into();
		let json_value = serde_json::to_value(WebHookEvent(event)).unwrap();

		let expected_json_value = json!({
			"aggregate_name":"Project",
			"event_name":"Created",
			"environment":"local",
			"payload":{
				"id": project_id.to_string(),
			}
		});

		assert_eq!(json_value, expected_json_value);
	}
}
