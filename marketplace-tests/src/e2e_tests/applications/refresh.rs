use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use reqwest::StatusCode;

pub async fn refresh() {
	let response = http::post(format!("{BACKEND_BASE_URI}/applications/refresh"), None).await;

	assert_eq!(
		response.status(),
		StatusCode::OK,
		"Invalid response received from POST"
	);
}
