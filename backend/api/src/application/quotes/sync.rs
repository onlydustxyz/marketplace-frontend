use std::sync::Arc;

use anyhow::Result;
use chrono::Utc;
use derive_more::Constructor;
use domain::{currencies, services::quotes::Service as QuoteService, Currency};
use infrastructure::{
	coinmarketcap,
	database::{self, Repository},
};

use crate::{models::CryptoUsdQuote, Config};

#[derive(Constructor)]
pub struct Usecase {
	crypto_usd_quote_repository: Arc<dyn Repository<CryptoUsdQuote>>,
	quote_service: Arc<dyn QuoteService>,
}

impl Usecase {
	pub async fn sync_quotes(&self) -> Result<usize> {
		let quotes = self.crypto_usd_quote_repository.list()?;

		let count = quotes.len();

		if !quotes.is_empty() {
			let currencies: Vec<_> =
				quotes.iter().map(|quote| <&'static Currency>::from(quote.currency)).collect();

			let prices = self.quote_service.fetch_conversion_rates(&currencies).await?;

			let quotes = quotes
				.into_iter()
				.zip(prices)
				.map(|(quote, price)| CryptoUsdQuote {
					price,
					updated_at: Utc::now().naive_utc(),
					..quote
				})
				.collect();

			self.crypto_usd_quote_repository.update_all(quotes)?;
		}

		Ok(count)
	}

	pub fn bootstrap(config: Config) -> Result<Self> {
		info!("Bootstrapping quotes::sync usecase");

		let database = Arc::new(database::Client::new(database::init_pool(
			config.database.clone(),
		)?));

		let coinmarketcap = Arc::new(coinmarketcap::Client::new(
			config.coinmarketcap,
			currencies::USD,
		));

		Ok(Self::new(database, coinmarketcap))
	}
}
