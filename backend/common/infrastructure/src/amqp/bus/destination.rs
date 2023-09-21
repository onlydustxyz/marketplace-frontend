#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Destination {
	Queue(String),
	Exchange(String),
}

impl Destination {
	pub fn queue(name: &str) -> Self {
		Self::Queue(name.into())
	}

	pub fn exchange(name: &str) -> Self {
		Self::Exchange(name.into())
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
			Destination::exchange("name"),
			Destination::Exchange(String::from("name"))
		);
	}
}
