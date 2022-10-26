use super::client::*;
use crate::domain::IndexerService;
use async_trait::async_trait;
use serde_json::json;

const INDEXER_FORMATION_TYPE: &str = "indexer";

pub struct HerokuClient {}

impl HerokuClient {
	fn create_client(&self) -> Result<HttpApiClient, anyhow::Error> {
		let client = HttpApiClient::create(&heroku_token())?;

		Ok(client)
	}

	async fn scale_formation(
		&self,
		formation_type: &str,
		quantity: u32,
	) -> Result<(), anyhow::Error> {
		let client = self.create_client()?;
		let app_name = &heroku_app_name();
		let body = reqwest::Body::from(serde_json::to_string(&json!({ "quantity": quantity }))?);

		let scale_formation_endpoint = HerokuEndpoint::new(
			reqwest::Method::PATCH,
			format!("/apps/{}/formation/{}", app_name, formation_type),
			Some(body),
		);
		client.request(scale_formation_endpoint).await?;

		Ok(())
	}
}

#[async_trait]
impl IndexerService for HerokuClient {
	async fn stop_indexer(&self) -> Result<(), anyhow::Error> {
		self.scale_formation(INDEXER_FORMATION_TYPE, 0).await?;

		Ok(())
	}
}

fn heroku_token() -> String {
	std::env::var("HEROKU_TOKEN").expect("HEROKU_TOKEN var must be set")
}

fn heroku_app_name() -> String {
	std::env::var("HEROKU_APP_NAME").expect("HEROKU_APP_NAME var must be set")
}
