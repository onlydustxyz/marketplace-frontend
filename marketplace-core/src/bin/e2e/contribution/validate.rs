use super::*;

pub async fn validate_contribution(contribution_id: &str) {
	println!("Validating contribution {contribution_id}");
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/{contribution_id}/validate"),
		None,
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
