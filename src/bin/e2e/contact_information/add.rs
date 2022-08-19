use super::*;
use serde_json::json;

pub async fn add_contact_information(contributor_id: u128, discord_handle: Option<String>) {
	let response = put(
		format!("{BACKEND_BASE_URI}/contributors/{contributor_id:#x}/contact-information"),
		Some(json!({
		  "discord_handle": discord_handle,
		})),
	)
	.await;

	assert_eq!(StatusCode::NO_CONTENT, response.status());
}
