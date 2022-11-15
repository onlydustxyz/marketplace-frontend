use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use reqwest::StatusCode;
use serde_json::json;

pub async fn register_discord_handle(contributor_account_address: &str, discord_handle: &str) {
	let response = http::put(
		format!("{BACKEND_BASE_URI}/contributors/{contributor_account_address}/discord"),
		Some(json!({
			"discord_handle": discord_handle,
		})),
	)
	.await;

	assert_eq!(
		response.status(),
		StatusCode::NO_CONTENT,
		"Invalid response received from PUT /discord"
	);
}
