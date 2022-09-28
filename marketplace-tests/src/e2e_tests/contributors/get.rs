use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use marketplace_core::dto::Contributor;
use reqwest::StatusCode;

pub async fn _get(contributor_id: String) -> Contributor {
	let response = http::get(format!("{BACKEND_BASE_URI}/contributors/{contributor_id}")).await;

	assert_eq!(
		response.status(),
		StatusCode::OK,
		"Invalid response received from GET"
	);
	let body = response.text().await.unwrap();
	serde_json::from_str(&body).expect("Invalid contributor")
}

pub async fn get_by_account(contributor_account: String) -> Contributor {
	let response = http::get(format!(
		"{BACKEND_BASE_URI}/contributors?contributor_account={contributor_account}"
	))
	.await;

	let body = response.text().await.unwrap();
	serde_json::from_str(&body).unwrap()
}
