use mockall::automock;
use uuid::Uuid;

#[automock]
pub trait Service: Send + Sync {
	fn new_uuid(&self) -> Uuid;
}

pub struct RandomUuidGenerator;

impl Service for RandomUuidGenerator {
	fn new_uuid(&self) -> Uuid {
		Uuid::new_v4()
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use regex::Regex;

	#[test]
	fn test_new_uuid() {
		let uuid = RandomUuidGenerator.new_uuid();
		let re = Regex::new(
			r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$",
		)
		.unwrap();
		assert!(re.is_match(&uuid.to_string()), "{}", uuid.to_string());
	}
}
