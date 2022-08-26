use super::*;
use serde_json::json;

pub async fn assign_contribution(contribution_id: &str, contributor_id: u128) {
	println!("Assigning contribution {contribution_id} to {contributor_id}");

	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id}/contributor"),
		Some(json!({
			"contributor_id": format!("{:#x}", contributor_id)
		})),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
