use crate::domain::*;
use crypto_bigint::U256;
use uuid::Uuid;

use crate::application::apply_to_contribution;

use super::{InMemoryApplicationRepository, SerialUuidGenerator};

#[test]
fn store_and_find_application() {
	let mut uuid_generator = SerialUuidGenerator(0);
	let mut application_repository = InMemoryApplicationRepository::new();

	let contributor_id = ContributorId::from(U256::ZERO);
	let contribution_id = Uuid::new_v4();

	assert!(
		apply_to_contribution(
			&mut application_repository,
			&mut uuid_generator,
			contribution_id,
			contributor_id,
		)
		.is_ok()
	);

	let expected_id = Uuid::from_u128(0);

	assert_eq!(
		application_repository.find(&expected_id),
		Ok(Application::new(
			expected_id,
			contribution_id,
			contributor_id
		))
	);
}
