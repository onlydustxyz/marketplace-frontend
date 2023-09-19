pub use anyhow::Result;
use async_trait::async_trait;
use rust_decimal::Decimal;

use crate::Currency;

#[async_trait]
pub trait Service {
	async fn fetch_conversion_rates(
		&self,
		currencies: &[&'static Currency],
	) -> Result<Vec<Decimal>>;
}
