use crate::e2e_tests::utils::*;
use reqwest::StatusCode;

pub async fn refresh() {
	println!("Refreshing projects");
	let response = post(format!("{BACKEND_BASE_URI}/projects/refresh"), None).await;
	assert_eq!(StatusCode::OK, response.status());
}
