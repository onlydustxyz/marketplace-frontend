/// `Destination` represents a RabbitMQ destination, which can either be a queue or an exchange.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Destination {
	/// Represents a RabbitMQ queue with a given `name`
	Queue(String),
	/// Represents a RabbitMQ exchange with a given `name`
	Exchange(String),
}

impl Destination {
	/// Creates a new `Destination` that represents a RabbitMQ queue with the given `name`
	///
	/// # Arguments
	///
	/// * `name` - A string slice that holds the name of the queue
	///
	/// # Example
	///
	/// ```
	/// use my_crate::Destination;
	///
	/// let queue = Destination::queue("my_queue");
	///
	/// assert_eq!(queue, Destination::Queue(String::from("my_queue")));
	/// ```
	pub fn queue(name: &str) -> Self {
		Self::Queue(name.into())
	}

	/// Creates a new `Destination` that represents a RabbitMQ exchange with the given `name`
	///
	/// # Arguments
	///
	/// * `name` - A string slice that holds the name of the exchange
	///
	/// # Example
	///
	/// ```
	/// use my_crate::Destination;
	///
	/// let exchange = Destination::exchange("my_exchange");
	///
	/// assert_eq!(exchange, Destination::Exchange(String::from("my_exchange")));
	/// ```
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