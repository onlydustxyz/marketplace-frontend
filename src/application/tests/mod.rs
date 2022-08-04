mod apply_to_contribution;

use std::{collections::HashMap, sync::RwLock};

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

struct InMemoryApplicationRepository(RwLock<HashMap<ApplicationId, Application>>);

impl InMemoryApplicationRepository {
	pub fn new() -> Self {
		Self(RwLock::new(HashMap::new()))
	}
}

impl ApplicationRepository for InMemoryApplicationRepository {
	fn store(&self, application: Application) -> Result<(), ApplicationRepositoryError> {
		self.0.write().unwrap().insert(*application.id(), application);
		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		Ok(self.0.read().unwrap().get(id).cloned())
	}
}
