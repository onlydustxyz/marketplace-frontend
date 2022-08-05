use super::*;

pub async fn list_all_projects() -> String {
	let response = get(format!("{BACKEND_BASE_URI}/projects")).await;

	assert_eq!(StatusCode::OK, response.status());
	response.text().await.unwrap()
}
