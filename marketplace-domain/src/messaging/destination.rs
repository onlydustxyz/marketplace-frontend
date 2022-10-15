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
