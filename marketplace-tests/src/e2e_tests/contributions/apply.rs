use crate::e2e_tests::http::*;
use reqwest::StatusCode;
use serde_json::json;

pub async fn apply(contribution_id: u64, contributor_id: &str) {
	println!("Applying to contribution {contribution_id} for contributor {contributor_id}");
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id:#x}/applications"),
		Some(json!({
		  "contributor_id": contributor_id,
		})),
	)
	.await;
	assert_eq!(StatusCode::CREATED, response.status());
}
