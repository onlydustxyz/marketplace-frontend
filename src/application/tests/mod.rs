mod apply_to_contribution;

use std::{cell::RefCell, collections::HashMap};

use crate::domain::*;
use uuid::Uuid;

struct SerialUuidGenerator(u128);

impl UuidGenerator for SerialUuidGenerator {
	fn new_uuid(&mut self) -> Uuid {
		let nonce = self.0;
		self.0 = nonce + 1;
		Uuid::from_u128(nonce)
	}
}

struct InMemoryApplicationRepository(RefCell<HashMap<ContributionId, Application>>);

impl InMemoryApplicationRepository {
	pub fn new() -> Self {
		Self(RefCell::new(HashMap::new()))
	}
}

impl ApplicationRepository for InMemoryApplicationRepository {
	fn store(&self, application: Application) -> Result<(), ApplicationRepositoryError> {
		self.0.borrow_mut().insert(*application.id(), application);
		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		Ok(self.0.borrow().get(id).cloned())
	}
}
