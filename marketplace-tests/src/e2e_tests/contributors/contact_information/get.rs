use crate::e2e_tests::utils::{self, BACKEND_BASE_URI};
use marketplace_core::dto::ContactInformation;

pub async fn get(contributor_id: u128) -> ContactInformation {
	let response = utils::get(format!(
		"{BACKEND_BASE_URI}/contributors/{contributor_id:#x}/contact-information"
	))
	.await;

	let projects = response.text().await.unwrap();
	serde_json::from_str(&projects).unwrap()
}
