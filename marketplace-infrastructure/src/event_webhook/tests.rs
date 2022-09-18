use std::{ffi::OsString, str::FromStr};

use super::*;
use assert_matches::assert_matches;
use envtestkit::{
	lock::{lock_read, lock_test},
	set_env,
};
use marketplace_domain::{ContributionEvent, ContributionId};
use mockito;

#[allow(clippy::await_holding_lock)]
#[tokio::test]
async fn env_variable_not_set() {
	let _lock = lock_read();

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});

	assert_matches!(
		send_event_to_webhook(&reqwest::Client::new(), &event).await,
		Err(Error::EnvVarNotSet(_))
	);
}

#[allow(clippy::await_holding_lock)]
#[tokio::test]
async fn env_variable_invalid() {
	let _lock = lock_test();
	let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), "Some random junk");

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});

	assert_matches!(
		send_event_to_webhook(&reqwest::Client::new(), &event).await,
		Err(Error::InvalidEnvVar(_))
	);
}

#[allow(clippy::await_holding_lock)]
#[tokio::test]
async fn http_call_fail() {
	let server_url = mockito::server_url();
	let _m = mockito::mock("POST", "/webhook").with_status(400).expect(1).create();

	let mut target_url = server_url.clone();
	target_url.push_str("/webhook");

	let _lock = lock_test();
	let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), &target_url);

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});

	assert_matches!(
		send_event_to_webhook(&reqwest::Client::new(), &event).await,
		Err(Error::RespondWithErrorStatusCode(_))
	);

	assert!(_m.matched());
}

#[test]
fn webhook_event_serialize() {
	let event = Event::Contribution(ContributionEvent::Validated {
		id: ContributionId::from_str("0x123").unwrap(),
	});

	let webhook_event = WebhookEvent::new(event.clone());

	let json = serde_json::to_string(&webhook_event).unwrap();

	assert_eq!(
		json,
		r#"{"aggregate_type":"Contribution","aggregate_id":"0x0123","event":"Validated","payload":{"Contribution":{"Validated":{"id":"0x0123"}}}}"#
	);
}
