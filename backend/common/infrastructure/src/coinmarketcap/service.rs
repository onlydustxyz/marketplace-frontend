use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{services::quotes, Currency};
use rust_decimal::{prelude::FromPrimitive, Decimal};

#[async_trait]
impl quotes::Service for super::Client {
	async fn fetch_conversion_rates(
		&self,
		currencies: &[&'static Currency],
	) -> Result<Vec<Decimal>> {
		let currencies = currencies.into_iter().map(|c| c.code.to_owned()).collect();
		let details = self.fetch_crypto_currency_details(currencies).await?;

		details
			.into_iter()
			.map(|currency| {
				Decimal::from_f64(currency.price)
					.ok_or_else(|| anyhow!("Unable to decode currency price"))
			})
			.collect()
	}

	async fn fetch_conversion_rate(&self, currency: &'static Currency) -> Result<Decimal> {
		self.fetch_conversion_rates(&[currency])
			.await?
			.pop()
			.ok_or_else(|| anyhow!("Invalid response received"))
	}
}
