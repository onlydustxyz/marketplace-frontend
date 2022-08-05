use reqwest::StatusCode;
use serde_json::json;

use super::{post, BACKEND_BASE_URI};

pub async fn add_project(owner: &str, name: &str) {
	let response = post(
		format!("{BACKEND_BASE_URI}/projects"),
		Some(json!({
			"owner": owner,
			"name": name
		})),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}
