use crate::e2e_tests::utils::{self, BACKEND_BASE_URI};
use marketplace_core::dto::Contributor;

pub async fn get(contributor_id: String) -> Contributor {
	let response = utils::get(format!("{BACKEND_BASE_URI}/contributors/{contributor_id}")).await;

	let body = response.text().await.unwrap();
	serde_json::from_str(&body).unwrap()
}
