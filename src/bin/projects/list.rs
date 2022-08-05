use super::*;

pub async fn list_all_projects() -> serde_json::Value {
	let response = get(format!("{BACKEND_BASE_URI}/projects")).await;

	assert_eq!(StatusCode::OK, response.status());
	let projects = response.text().await.unwrap();
	serde_json::from_str(&projects).unwrap()
}
