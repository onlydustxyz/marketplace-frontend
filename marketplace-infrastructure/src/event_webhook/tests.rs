use std::ffi::OsString;

use super::*;
use envtestkit::{
	lock::{lock_read, lock_test},
	set_env,
};
use log::Level;
use marketplace_domain::ContributionEvent;
use mockito;
use serial_test::serial;

#[tokio::test]
#[serial]
async fn env_variable_not_set() {
	testing_logger::setup();
	let _lock = lock_read();
	let webhook = EventWebHook::new(reqwest::Client::new());

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});
	webhook.on_event(&event).await;

	testing_logger::validate(|captured_logs| {
		assert_eq!(
			captured_logs[0].body,
			format!(
				"Event webhook ignored: environment variable '{WEBHOOK_TARGET_ENV_VAR}' is not set"
			)
		);
		assert_eq!(captured_logs[0].level, Level::Info);
	});
}

#[tokio::test]
#[serial]
async fn env_variable_invalid() {
	testing_logger::setup();
	let _lock = lock_test();
	let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), "Some random junk");
	let webhook = EventWebHook::new(reqwest::Client::new());

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});
	webhook.on_event(&event).await;

	testing_logger::validate(|captured_logs| {
		assert_eq!(
			captured_logs[0].body,
			format!(
				"Failed to parse environment variable '{WEBHOOK_TARGET_ENV_VAR}' content to Url: relative URL without a base"
			)
		);
		assert_eq!(captured_logs[0].level, Level::Error);
	});
}

#[tokio::test]
#[serial]
async fn http_call_fail() {
	testing_logger::setup();
	let server_url = mockito::server_url();
	let _m = mockito::mock("POST", "/webhook").with_status(400).expect(1).create();

	let mut target_url = server_url.clone();
	target_url.push_str("/webhook");

	let _lock = lock_test();
	let _test = set_env(OsString::from(WEBHOOK_TARGET_ENV_VAR), &target_url);

	let webhook = EventWebHook::new(reqwest::Client::new());

	let event = Event::Contribution(ContributionEvent::Validated {
		id: Default::default(),
	});
	webhook.on_event(&event).await;

	assert!(_m.matched());

	testing_logger::validate(|captured_logs| {
		assert!(
			captured_logs
				.last()
				.unwrap()
				.body
				.starts_with("WebHook target failed to process event:")
		);
		assert_eq!(captured_logs.last().unwrap().level, Level::Error);
	});
}
