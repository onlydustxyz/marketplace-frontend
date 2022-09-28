use crate::e2e_tests::http::*;
use reqwest::StatusCode;

pub async fn refuse_application(contribution_id: &str, contributor_id: &str) {
	println!(
		"Refusing application to contribution {contribution_id} for contributor {contributor_id}"
	);
	let response = delete(format!(
		"{BACKEND_BASE_URI}/contributions/{contribution_id}/applications?contributor_id={contributor_id}"
	))
	.await;
	assert_eq!(StatusCode::NO_CONTENT, response.status());
}
