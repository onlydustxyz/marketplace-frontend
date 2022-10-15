#[derive(Debug, PartialEq, Eq)]
pub enum Destination {
	Queue(String),
	Exchange { name: String, topic: String },
}

impl Destination {
	pub fn queue(name: &str) -> Self {
		Self::Queue(name.into())
	}

	pub fn exchange(name: &str, topic: &str) -> Self {
		Self::Exchange {
			name: name.into(),
			topic: topic.into(),
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn create_queue_destination() {
		assert_eq!(
			Destination::queue("name"),
			Destination::Queue(String::from("name"))
		);
	}

	#[test]
	fn create_exchange_destination() {
		assert_eq!(
			Destination::exchange("name", "topic"),
			Destination::Exchange {
				name: String::from("name"),
				topic: String::from("topic")
			}
		);
	}
}
