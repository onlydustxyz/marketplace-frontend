use crate::e2e_tests::http::*;
use reqwest::StatusCode;
use serde_json::json;

pub async fn apply(contribution_id: &str, contributor_account_address: &str) {
	println!(
		"Applying to contribution {contribution_id} for contributor {contributor_account_address}"
	);
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id}/applications"),
		Some(json!({
		  "contributor_account_address": contributor_account_address,
		})),
	)
	.await;
	assert_eq!(StatusCode::CREATED, response.status());
}
