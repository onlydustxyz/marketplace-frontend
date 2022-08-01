use uuid::Uuid;

pub trait Service {
	fn new_uuid(&self) -> Uuid;
}

pub struct RandomUuidGenerator;

impl Service for RandomUuidGenerator {
	fn new_uuid(&self) -> Uuid {
		Uuid::new_v4()
	}
}
