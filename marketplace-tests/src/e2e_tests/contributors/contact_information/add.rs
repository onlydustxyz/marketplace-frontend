use crate::e2e_tests::http::*;
use reqwest::StatusCode;
use serde_json::json;

pub async fn add(contributor_id: &str, discord_handle: Option<String>) {
	let response = put(
		format!("{BACKEND_BASE_URI}/contributors/{contributor_id}/contact-information"),
		Some(json!({
		  "discord_handle": discord_handle,
		})),
	)
	.await;

	assert_eq!(StatusCode::NO_CONTENT, response.status());
}
