mod config;

use std::collections::HashMap;

use cmc::{
	api::cryptocurrency::quotes_latest_v2 as quotes,
	async_api::{Cmc, CmcBuilder},
};
use domain::{currencies, Currency};
use thiserror::Error;

pub use self::config::Config;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Currency {0} is not supported")]
	UnsupportedCurrency(String),
	#[error("Could not find latest quote for currency {0}")]
	NotFound(String),
	#[error(transparent)]
	Api(#[from] cmc::errors::CmcErrors),
}

type Result<T> = std::result::Result<T, Error>;

pub struct Client {
	client: Cmc,
	currencies: HashMap<String, String>,
}

impl Client {
	pub fn new(config: Config, base_currency: &'static Currency) -> Self {
		let mut builder =
			CmcBuilder::new(config.api_key).pass(cmc::Pass::Id).convert(base_currency.code);

		if let Some(base_url) = config.base_url {
			builder = builder.base_url(base_url);
		}

		Self {
			client: builder.build(),
			currencies: config.currencies,
		}
	}

	pub async fn fetch_crypto_currency_details(
		&self,
		currencies: Vec<String>,
	) -> Result<Vec<quotes::Currency>> {
		let currencies = self.get_currencies_ids(&currencies)?;

		let response = self.client.quotes_latest_by_id(currencies.join(",")).await?;

		currencies
			.into_iter()
			.map(|currency| {
				response
					.data
					.get(&currency)
					.and_then(|currency| currency.quote.get(currencies::USD.code).cloned())
					.ok_or_else(|| Error::NotFound(currency.to_owned()))
			})
			.collect()
	}

	fn get_currency_id(&self, currency: &str) -> Result<String> {
		self.currencies
			.get(currency)
			.cloned()
			.ok_or_else(|| Error::UnsupportedCurrency(currency.to_owned()))
	}

	fn get_currencies_ids(&self, currencies: &[String]) -> Result<Vec<String>> {
		currencies.iter().map(|currency| self.get_currency_id(&currency)).collect()
	}
}
