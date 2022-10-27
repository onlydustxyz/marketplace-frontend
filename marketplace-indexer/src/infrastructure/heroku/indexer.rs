use super::client::*;
use crate::domain::IndexerService;
use async_trait::async_trait;
use serde_json::json;

const INDEXER_FORMATION_TYPE: &str = "indexer";

#[async_trait]
impl IndexerService for HerokuClient {
	async fn stop_indexer(&self) -> Result<(), anyhow::Error> {
		let app_name = &heroku_app_name();
		let body = reqwest::Body::from(serde_json::to_string(&json!({ "quantity": 0 }))?);
		let scale_formation_endpoint = HerokuEndpoint::new(
			reqwest::Method::PATCH,
			format!("/apps/{}/formation/{}", app_name, INDEXER_FORMATION_TYPE),
			Some(body),
		);

		self.request(scale_formation_endpoint).await?;

		Ok(())
	}
}

fn heroku_app_name() -> String {
	std::env::var("HEROKU_APP_NAME").expect("HEROKU_APP_NAME var must be set")
}

#[cfg(test)]
mod test {
	use super::*;
	use assert_matches::assert_matches;
	use envtestkit::lock::lock_test;
	use mockito::Matcher;

	#[allow(clippy::await_holding_lock)]
	#[tokio::test]
	async fn http_call_fail() {
		let _m = mockito::mock(
			reqwest::Method::PATCH.as_str(),
			Matcher::Regex(r"^/apps/[a-z-]*/formation/[a-z]*$".to_string()),
		)
		.match_header("Authorization", Matcher::Any)
		.with_status(200)
		.expect(1)
		.create();

		std::env::set_var("HEROKU_TOKEN", String::from("1234"));
		std::env::set_var("HEROKU_APP_NAME", String::from("test-app"));

		let _lock = lock_test();

		let heroku_client = HerokuClient::new().expect("Could not create client");

		assert_matches!(heroku_client.stop_indexer().await, Ok(()));

		assert!(_m.matched());
	}
}
