mod apply_to_contribution;

use std::collections::HashMap;

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

struct InMemoryApplicationRepository(HashMap<ContributionId, Application>);

impl InMemoryApplicationRepository {
	pub fn new() -> Self {
		Self(HashMap::new())
	}
}

impl ApplicationRepository for InMemoryApplicationRepository {
	fn store(&mut self, application: Application) -> Result<()> {
		self.0.insert(*application.id(), application);
		Ok(())
	}

	fn find(&self, id: &ApplicationId) -> Result<Application> {
		self.0
			.get(id)
			.cloned()
			.ok_or_else(|| Error::ApplicationStoreError("Not found".to_string()))
	}
}
