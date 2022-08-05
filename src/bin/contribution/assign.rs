use super::*;
use serde_json::json;

pub async fn assign_contribution(contribution_id: uuid::Uuid, contributor_id: u128) {
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id}/contributor"),
		Some(json!({ "contributor_id": contributor_id })),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
