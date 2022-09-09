use crate::e2e_tests::utils::*;
use reqwest::StatusCode;

pub async fn refresh() {
	println!("Refreshing contributions");
	let response = post(format!("{BACKEND_BASE_URI}/contributions/refresh"), None).await;
	assert_eq!(StatusCode::OK, response.status());
}
