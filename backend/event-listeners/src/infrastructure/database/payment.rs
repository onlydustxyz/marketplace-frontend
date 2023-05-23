/// This module provides a `Repository` for the `Payment` entity. The `Repository` uses an `Arc` of a
/// `Client`, provided by infrastructure::database, for handling the database connection.
use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::payments::dsl, Client};

use crate::domain::Payment;

/// Represents a repository for the `Payment` entity.
#[derive(DieselRepository, Constructor)]
#[entity(Payment)]
#[table(dsl::payments)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mod tests {
	use chrono::Utc;
	use dotenv::dotenv;
	use infrastructure::database::Config;
	use rstest::*;
	use rust_decimal_macros::dec;
	use serde_json::json;
	use testing::init_pool;
	use uuid::Uuid;

	use super::*;

	/// Returns a new instance of `Config` for testing purposes.
	#[fixture]
	#[once]
	fn config() -> Config {
		Config::new(
			"postgres://postgres:postgres@localhost/marketplace_db".to_string(),
			20,
		)
	}

	/// Initializes a new instance of `Repository` for testing purposes.
	#[fixture]
	fn repository(config: &Config) -> Repository {
		dotenv().ok();
		Repository(Arc::new(Client::new(init_pool(config))))
	}

	/// Tests the `DeriveDieselRepository` macro by inserting, updating, deleting and clearing a
	/// `Payment` entity.
	#[rstest]
	fn test_macro(repository: Repository) {
		let payment_id = Uuid::new_v4().into();
		let payment = Payment::new(
			payment_id,
			dec!(500.45),
			"USDC".to_string(),
			json!({}),
			Uuid::new_v4(),
			Utc::now().naive_utc(),
		);

		assert!(repository.insert(&payment).is_ok());
		assert!(repository.update(&payment_id, &payment).is_ok());
		assert!(repository.delete(&payment_id).is_ok());
		assert!(repository.clear().is_ok());
	}
}