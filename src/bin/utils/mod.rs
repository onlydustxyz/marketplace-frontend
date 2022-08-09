use assert_json_diff::assert_json_include;
use deathnote_contributions_feeder::dto::{Contribution, Project};
use dotenv::dotenv;
use reqwest::Response;
use serde_json::Value;

#[cfg(debug_assertions)]
pub const BACKEND_BASE_URI: &str = "http://localhost:8000";

#[cfg(not(debug_assertions))]
pub const BACKEND_BASE_URI: &str = "http://localhost:80";

pub async fn post(url: String, body: Option<serde_json::Value>) -> Response {
	let client = reqwest::Client::new();
	let mut builder = client
		.post(url)
		.header("content-type", "application/json")
		.header("Api-Key", api_key());

	if let Some(body) = body {
		builder = builder.body(body.to_string());
	}

	let response = builder.send().await;

	assert!(response.is_ok(), "{}", response.err().unwrap());
	response.unwrap()
}

fn api_key() -> String {
	dotenv().ok();
	std::env::var("API_KEY").unwrap_or_default()
}

pub async fn get(url: String) -> Response {
	let response = reqwest::get(url).await;

	assert!(response.is_ok(), "{}", response.err().unwrap());
	response.unwrap()
}

pub fn compare_projects_to_expected(actual: Vec<Project>, expected: Value) {
	let actual_json = serde_json::to_value(actual).unwrap();
	assert_json_include!(actual: actual_json, expected: expected);
}

pub fn find_project_by_title(projects: &[Project], title: &'static str) -> Option<Project> {
	projects.iter().find(|project| project.title == title).cloned()
}

pub fn find_contribution_by_onchain_id(
	project: &Project,
	contribution_onchain_id: u64,
) -> Option<Contribution> {
	project
		.contributions
		.iter()
		.find(|contribution| contribution.onchain_id == contribution_onchain_id.to_string())
		.cloned()
}
