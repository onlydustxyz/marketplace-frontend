mod bus;
pub use bus::{Bus, ConsumableBus, Error as BusError};

mod config;
pub use config::Config;

mod publisher;
mod subscriber;

mod unique_message;
pub use unique_message::UniqueMessage;

mod command;
pub use command::{
	CommandMessage, CommandPublisher, CommandPublisherDecorator, CommandSubscriberDecorator,
};

#[cfg(test)]
mod test {
	use rstest::fixture;

	use super::Config;

	#[fixture]
	#[once]
	pub fn config() -> Config {
		Config {
			url: "amqp://127.0.0.1:5672/%2f".to_string(),
			connection_retry_interval_ms: 200,
			connection_retry_count: 0,
		}
	}
}
