use super::*;

use deathnote_contributions_feeder::dto::ContactInformation;

pub async fn get_contact_information(contributor_id: u128) -> ContactInformation {
	let response = get(format!(
		"{BACKEND_BASE_URI}/contributors/{contributor_id:#x}/contact-information"
	))
	.await;

	let projects = response.text().await.unwrap();
	serde_json::from_str(&projects).unwrap()
}
