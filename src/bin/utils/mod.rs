use assert_json_diff::assert_json_include;
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

pub fn compare_jsons(actual: Value, expected: Value) {
	assert_json_include!(actual: actual, expected: expected);
}

pub fn find_project_by_title(projects: &Value, title: &'static str) -> serde_json::Value {
	projects
		.as_array()
		.expect("projects is not an array")
		.iter()
		.find(|project| project["title"] == title)
		.unwrap_or_else(|| panic!("could not find {title}"))
		.to_owned()
}

pub fn find_contribution_by_onchain_id(project: &Value, contribution_onchain_id: u64) -> Value {
	project["contributions"]
		.as_array()
		.expect("contributions is not an array")
		.iter()
		.find(|contribution| contribution["onchain_id"] == contribution_onchain_id.to_string())
		.expect("cound not find contribution")
		.to_owned()
}
