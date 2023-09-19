use anyhow::{anyhow, Result};
use domain::Currency;
use infrastructure::coinmarketcap;
use rust_decimal::{prelude::FromPrimitive, Decimal};

use crate::domain::services::quotes;

#[async_trait]
impl quotes::Service for coinmarketcap::Client {
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
}
