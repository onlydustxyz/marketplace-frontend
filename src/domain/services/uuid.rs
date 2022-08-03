use uuid::Uuid;

pub trait Service: Send + Sync {
	fn new_uuid(&mut self) -> Uuid;
}

pub struct RandomUuidGenerator;

impl Service for RandomUuidGenerator {
	fn new_uuid(&mut self) -> Uuid {
		Uuid::new_v4()
	}
}
