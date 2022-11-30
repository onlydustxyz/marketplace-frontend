use std::sync::Arc;

use crate::domain::Payment;
use infrastructure::database::{schema::payments::dsl, Client};

#[derive(DieselRepository)]
#[entity(Payment)]
#[table(dsl::payments)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

impl Repository {
	pub fn new(client: Arc<Client>) -> Self {
		Self(client)
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use ::domain::EntityRepository;
	use dotenv::dotenv;
	use rstest::*;
	use rust_decimal_macros::dec;
	use serde_json::json;
	use testing::init_pool;
	use uuid::Uuid;

	#[fixture]
	fn repository() -> Repository {
		dotenv().ok();
		Repository(Arc::new(Client::new(init_pool())))
	}

	#[rstest]
	fn test_macro(repository: Repository) {
		let payment_id = Uuid::new_v4();
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
