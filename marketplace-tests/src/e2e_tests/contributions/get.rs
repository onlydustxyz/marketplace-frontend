use crate::e2e_tests::http::{self, BACKEND_BASE_URI};
use marketplace_core::dto::Contribution;

pub async fn get(project_id: Option<u64>, contributor_address: Option<&str>) -> Vec<Contribution> {
	let mut url = format!("{BACKEND_BASE_URI}/contributions?");
	if let Some(project_id) = project_id {
		url.push_str(&format!("project_id={project_id}&"));
	}
	if let Some(contributor_address) = contributor_address {
		url.push_str(&format!("contributor_address={contributor_address}"));
	}

	let response = http::get(url).await;
	println!("res: {response:?}");

	let body = response.text().await.unwrap();
	serde_json::from_str(&body).unwrap()
}
