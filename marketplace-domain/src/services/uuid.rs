use mockall::automock;
use uuid::Uuid;

#[automock]
pub trait Service: Send + Sync {
	fn new_uuid(&mut self) -> Uuid;
}

pub struct RandomUuidGenerator;

impl Service for RandomUuidGenerator {
	fn new_uuid(&mut self) -> Uuid {
		Uuid::new_v4()
	}
}
