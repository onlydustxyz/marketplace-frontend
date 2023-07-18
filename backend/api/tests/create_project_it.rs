mod fixtures;

use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;

use crate::fixtures::{setup, Setup};

#[rstest]
#[tokio::test]
pub async fn it(#[future] setup: Setup) {
	let setup = setup.await;
	let client = setup.client;

	let create_project_request = json!({
		"name": "name-test",
		"short_description": "short-description-name",
		"long_description": "long-description-name",
		"telegram_link": "http://telegram-link.test",
	});

	// When
	let response = client
		.post("/api/projects")
		.header(ContentType::JSON)
		.body(create_project_request.to_string())
		.dispatch();

	// Then
	let local_response = response.await;
	assert_eq!(local_response.status(), Status::Ok);
}
