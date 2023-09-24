use domain::{currencies, sponsor};
use http_api_problem::HttpApiProblem;
use reqwest::StatusCode;
use rust_decimal::Decimal;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Allocation {
	amount: Decimal,
	currency: String,
	sponsor: Option<sponsor::Id>,
}

impl TryFrom<Allocation> for (domain::Amount, Option<sponsor::Id>) {
	type Error = HttpApiProblem;

	fn try_from(
		Allocation {
			amount,
			currency,
			sponsor,
		}: Allocation,
	) -> Result<Self, Self::Error> {
		let currency = currencies::find(&currency).ok_or_else(|| {
			HttpApiProblem::new(StatusCode::UNPROCESSABLE_ENTITY).title("Invalid currency")
		})?;

		Ok((domain::Amount::from_decimal(amount, currency), sponsor))
	}
}
