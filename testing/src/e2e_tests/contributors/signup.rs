use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use reqwest::StatusCode;
use serde_json::json;
use uuid::Uuid;

pub async fn signup(contributor_id: &Uuid) {
	let response = http::put(
		format!("{BACKEND_BASE_URI}/contributors/{contributor_id}/github"),
		Some(json!({
			"authorization_code": "0x1234",
		})),
	)
	.await;

	assert_eq!(
		response.status(),
		StatusCode::NO_CONTENT,
		"Invalid response received from PUT /github"
	);
}
