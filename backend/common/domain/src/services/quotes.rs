pub use anyhow::Result;
use async_trait::async_trait;
use rust_decimal::Decimal;

use crate::Currency;

#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_conversion_rate(&self, currency: &'static Currency) -> Result<Decimal>;

	async fn fetch_conversion_rates(
		&self,
		currencies: &[&'static Currency],
	) -> Result<Vec<Decimal>>;
}
