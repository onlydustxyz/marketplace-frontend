use std::sync::{Arc, RwLock};

use crate::{application::ApplyToContribution, domain::*};
use crypto_bigint::U256;
use uuid::Uuid;

use super::{InMemoryApplicationRepository, SerialUuidGenerator};

#[test]
fn store_and_find_application() {
	let uuid_generator = SerialUuidGenerator(0);
	let application_repository = Arc::new(InMemoryApplicationRepository::new());

	let contributor_id = ContributorId::from(U256::ZERO);
	let contribution_id = Uuid::new_v4();

	let usecase = ApplyToContribution::new_usecase_boxed(
		application_repository.clone(),
		Arc::new(RwLock::new(uuid_generator)),
	);

	assert!(usecase.apply_to_contribution(contribution_id, contributor_id,).is_ok());

	let expected_id = Uuid::from_u128(0);

	assert_eq!(
		application_repository.find(&expected_id).unwrap(),
		Some(Application::new(
			expected_id,
			contribution_id,
			contributor_id
		))
	);
}
