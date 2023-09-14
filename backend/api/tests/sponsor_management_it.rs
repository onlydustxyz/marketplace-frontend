mod context;
mod models;

use anyhow::Result;
use api::{models::Sponsor, presentation::http::routes::sponsors::create::Response};
use infrastructure::database::schema::sponsors;
use olog::info;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::{
	context::{docker, utils::api_key_header, Context},
	diesel::RunQueryDsl,
};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn payment_processing(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.can_create_a_sponsor().await.expect("can_create_a_sponsor");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn can_create_a_sponsor(&mut self) -> Result<()> {
		info!("can_create_a_sponsor");

		// Given
		let request = json!({
			"name": "Starknet",
			"logoUrl": "https://s2.coinmarketcap.com/static/img/coins/200x200/22691.png",
			"url": "https://www.starknet.io/en",
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/sponsors")
			.header(ContentType::JSON)
			.header(api_key_header())
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap_or_default()
		);
		let response: Response = response.into_json().await.unwrap();

		let sponsor_id = response.sponsor_id;

		let mut sponsors: Vec<Sponsor> =
			sponsors::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(sponsors.len(), 1);

		let sponsor = sponsors.pop().unwrap();
		assert_eq!(
			sponsor,
			Sponsor {
				id: sponsor_id,
				name: "Starknet".to_string(),
				logo_url: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/13925002259599074250.png"
					.parse()
					.unwrap(),
				url: Some("https://www.starknet.io/en".parse().unwrap()),
			}
		);

		Ok(())
	}
}
