use std::sync::Arc;

use crate::domain::Payment;
use derive_more::Constructor;
use infrastructure::database::{schema::payments::dsl, Client};

#[derive(DieselRepository, Constructor)]
#[entity(Payment)]
#[table(dsl::payments)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mod tests {
	use super::*;
	use dotenv::dotenv;
	use infrastructure::database::Config;
	use rstest::*;
	use rust_decimal_macros::dec;
	use serde_json::json;
	use testing::init_pool;
	use uuid::Uuid;

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
		let payment = Payment::new(
			payment_id,
			dec!(500.45),
			"USDC".to_string(),
			json!({}),
			Uuid::new_v4(),
		);

		assert!(repository.insert(&payment).unwrap_err().to_string().contains("foreign key")); // foreign key on payment requests
		assert!(repository.update(&payment_id, &payment).is_ok());
		assert!(repository.delete(&payment_id).is_ok());
		assert!(repository.clear().is_ok());
	}
}
