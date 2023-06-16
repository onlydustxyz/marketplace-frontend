use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::payments::dsl, Client};

use crate::domain::Payment;

#[derive(DieselRepository, Constructor)]
#[entity(Payment)]
#[table(dsl::payments)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mod tests {
	use chrono::Utc;
	use domain::PaymentId;
	use dotenv::dotenv;
	use infrastructure::database::Config;
	use rstest::*;
	use rust_decimal_macros::dec;
	use serde_json::json;
	use testing::init_pool;
	use uuid::Uuid;

	use super::*;

	#[fixture]
	#[once]
	fn config() -> Config {
		Config::new(
			"postgres://postgres:postgres@localhost/marketplace_db".to_string(),
			20,
		)
	}

	#[fixture]
	fn repository(config: &Config) -> Repository {
		dotenv().ok();
		Repository(Arc::new(Client::new(init_pool(config))))
	}

	#[rstest]
	fn test_macro(repository: Repository) {
		let payment_id = Uuid::new_v4().into();
		let payment = Payment {
			id: payment_id,
			amount: dec!(500.45),
			currency_code: "USDC".to_string(),
			receipt: json!({}),
			request_id: PaymentId::new(),
			processed_at: Utc::now().naive_utc(),
		};

		assert!(repository.insert(&payment).is_ok());
		assert!(repository.update(&payment_id, &payment).is_ok());
		assert!(repository.delete(&payment_id).is_ok());
		assert!(repository.clear().is_ok());
	}
}
