use super::*;
use serde_json::json;

pub async fn add_contribution(
	github_issue_number: u32,
	project_id: u32,
	gate: u8,
	validator: &str,
) {
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/github"),
		json!({
		  "github_issue_number": github_issue_number,
		  "project_id": project_id,
		  "gate": gate,
		  "validator": validator
		}),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
