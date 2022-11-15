use std::ffi::OsString;

use super::*;
use assert_matches::assert_matches;
use envtestkit::{
	lock::{lock_read, lock_test},
	set_env,
};
use mockito;
use testing::fixtures;

#[allow(clippy::await_holding_lock)]
#[tokio::test]
async fn env_variable_not_set() {
	let _lock = lock_read();

	let event: Event = fixtures::payment::events::payment_processed().into();

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

	let event: Event = fixtures::payment::events::payment_processed().into();

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

	let event: Event = fixtures::payment::events::payment_processed().into();

	assert_matches!(
		send_event_to_webhook(&reqwest::Client::new(), &event).await,
		Err(Error::RespondWithErrorStatusCode(_))
	);

	assert!(_m.matched());
}

#[test]
fn webhook_event_serialize() {
	let event: Event = fixtures::payment::events::payment_processed().into();

	let webhook_event = WebhookEvent::new(event);

	let json = serde_json::to_string(&webhook_event).unwrap();

	assert_eq!(
		json,
		r#"{"aggregate_name":"Payment","event_name":"Processed","payload":{"id":"abad1756-18ba-42e2-8cbf-83369cecfb38","receipt":{"OnChainPayment":{"network":"Ethereum","recipient_address":"0x07B3616D2450b6390e9D14B92DE8B766e6d93Fd22fB9AFdE882705154045F2e1","transaction_hash":"0x797fb77202901c52094d2544f3631a3535b8ca40009f6a6ac6940b67e6873a4"}}}}"#
	);
}
