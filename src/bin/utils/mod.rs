use assert_json_diff::assert_json_include;
use dotenv::dotenv;
use reqwest::Response;

#[cfg(debug_assertions)]
pub const BACKEND_BASE_URI: &str = "http://localhost:8000";

#[cfg(not(debug_assertions))]
pub const BACKEND_BASE_URI: &str = "http://localhost:80";

pub async fn post(url: String, body: serde_json::Value) -> Response {
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

pub async fn get(url: String) -> Response {
	let response = reqwest::get(url).await;

	assert!(response.is_ok(), "{}", response.err().unwrap());
	response.unwrap()
}

pub fn compare_jsons(actual: String, expected: String) {
	let actual: serde_json::Value = serde_json::from_str(&actual).unwrap();
	let expected: serde_json::Value = serde_json::from_str(&expected).unwrap();

	assert_json_include!(actual: actual, expected: expected);
}
