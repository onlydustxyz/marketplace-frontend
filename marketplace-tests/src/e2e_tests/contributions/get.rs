use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use marketplace_core::dto::Contribution;

pub async fn get() -> Vec<Contribution> {
	let url = format!("{BACKEND_BASE_URI}/contributions");

	let response = http::get(url).await;
	println!("res: {response:?}");

	let body = response.text().await.unwrap();
	serde_json::from_str(&body).unwrap()
}
