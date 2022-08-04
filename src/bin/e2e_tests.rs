use assert_json_diff::assert_json_include;
use dotenv::dotenv;
use reqwest::{Response, StatusCode};
use serde_json::json;
use std::fs::read_to_string;

#[cfg(debug_assertions)]
const BACKEND_BASE_URI: &str = "http://localhost:8000";

#[cfg(not(debug_assertions))]
const BACKEND_BASE_URI: &str = "http://localhost:80";

#[tokio::main]
async fn main() {
	add_all_projects().await;

	compare_jsons(
		list_all_projects().await,
		read_to_string("src/data/projects.json").unwrap(),
	);
}

async fn post(url: String, body: serde_json::Value) -> Response {
	let client = reqwest::Client::new();
	let response = client
		.post(url)
		.header("content-type", "application/json")
		.header("Api-Key", api_key())
		.body(body.to_string())
		.send()
		.await;

	assert!(response.is_ok(), "{}", response.err().unwrap());
	response.unwrap()
}

fn api_key() -> String {
	dotenv().ok();
	std::env::var("API_KEY").unwrap_or_default()
}

async fn get(url: String) -> Response {
	let response = reqwest::get(url).await;

	assert!(response.is_ok(), "{}", response.err().unwrap());
	response.unwrap()
}

async fn add_project(owner: &str, name: &str) {
	let response = post(
		format!("{BACKEND_BASE_URI}/projects"),
		json!({
			"owner": owner,
			"name": name
		}),
	)
	.await;

	assert_eq!(StatusCode::ACCEPTED, response.status());
}

async fn list_all_projects() -> String {
	let response = get(format!("{BACKEND_BASE_URI}/projects")).await;

	assert_eq!(StatusCode::OK, response.status());
	response.text().await.unwrap()
}

async fn add_all_projects() {
	add_project("onlydustxyz", "starkonquest").await;
	add_project("onlydustxyz", "starklings").await;
}

fn compare_jsons(actual: String, expected: String) {
	let actual: serde_json::Value = serde_json::from_str(&actual).unwrap();
	let expected: serde_json::Value = serde_json::from_str(&expected).unwrap();

	assert_json_include!(actual: actual, expected: expected);
}
