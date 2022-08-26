use super::*;
use marketplace_core::dto::ContributionCreation;

pub async fn add_contribution(github_issue_number: i64, project_id: u64, gate: u8) {
	println!("Adding contribution {project_id}/{github_issue_number} with gate {gate}");

	let body = ContributionCreation::new(github_issue_number, project_id, gate);
	let response = post(
		format!("{BACKEND_BASE_URI}/contributions/github"),
		Some(serde_json::to_value(&body).unwrap()),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
