use anyhow::Result;
use chrono::Utc;
use domain::{currencies, BudgetId, Destination};
use event_listeners::models::CryptoUsdQuote;
use fixtures::*;
use infrastructure::database::{enums::Currency, ImmutableRepository};
use olog::info;
use rstest::rstest;
use rust_decimal_macros::dec;
use testcontainers::clients::Cli;

use crate::context::{docker, event_listeners::Context};

mod context;
mod fixtures;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn quote_sync_upon_budget_creation_it(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_fetch_crypto_price_upon_budget_creation()
		.await
		.expect("should_fetch_crypto_price_upon_budget_creation");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_fetch_crypto_price_upon_budget_creation(&mut self) -> Result<()> {
		info!("should_fetch_crypto_price_upon_budget_creation");

		// Given
		let before = Utc::now().naive_utc();

		// When
		self.context
			.amqp
			.publish(
				Destination::queue("quote_sync"),
				domain::BudgetEvent::Created {
					id: BudgetId::new(),
					currency: currencies::ETH,
				},
			)
			.await?;

		// Then
		let mut quotes: Vec<CryptoUsdQuote> = retry(
			|| self.context.database.client.list(),
			|res| !res.is_empty(),
		)
		.await?;
		assert_eq!(quotes.len(), 1, "Invalid quotes count");

		let after = Utc::now().naive_utc();

		let quote = quotes.pop().unwrap();
		assert_eq!(quote.currency, Currency::Eth);
		assert_eq!(quote.price, dec!(1654.354727031965));
		assert!(before <= quote.updated_at);
		assert!(after >= quote.updated_at);

		Ok(())
	}
}
