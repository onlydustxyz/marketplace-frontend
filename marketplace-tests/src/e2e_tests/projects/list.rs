use crate::e2e_tests::http::*;
use marketplace_core::dto::Project;

pub async fn list() -> Vec<Project> {
	let response = get(format!("{BACKEND_BASE_URI}/projects")).await;

	let projects = response.text().await.unwrap();
	serde_json::from_str(&projects).unwrap()
}
