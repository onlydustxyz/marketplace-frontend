use crate::e2e_tests::http::*;
use marketplace_core::dto::Application;

pub async fn list_for_contributor(contributor_id: &str) -> Vec<Application> {
	let response = get(format!("{BACKEND_BASE_URI}/applications?{contributor_id}")).await;

	let applications = response.text().await.unwrap();
	serde_json::from_str(&applications).unwrap()
}
