use super::*;
use marketplace_backend::dto::Project;

pub async fn list_all_projects() -> Vec<Project> {
	let response = get(format!("{BACKEND_BASE_URI}/projects")).await;

	let projects = response.text().await.unwrap();
	serde_json::from_str(&projects).unwrap()
}
