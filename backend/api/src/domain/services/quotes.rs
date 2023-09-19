pub use anyhow::Result;
use domain::Currency;
use rust_decimal::Decimal;

#[async_trait]
pub trait Service {
	async fn fetch_conversion_rates(
		&self,
		currencies: &[&'static Currency],
	) -> Result<Vec<Decimal>>;
}
