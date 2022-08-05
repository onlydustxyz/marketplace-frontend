use super::*;

pub async fn validate_contribution(contribution_id: uuid::Uuid) {
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id}/validate"),
		None,
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
