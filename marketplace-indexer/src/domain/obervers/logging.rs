use log::info;

use super::*;

type LoggingCallback = dyn Fn(String) + Sync;
pub struct Logger<'a>(&'a LoggingCallback);

impl<'a> Logger<'a> {
	pub fn new(logger: &'a LoggingCallback) -> Self {
		Self(logger)
	}
}

impl Observer for Logger<'_> {
	fn on_connect(&self, indexer_id: &IndexerId) {
		self.0(format!("🔗 Indexer `{indexer_id}` connected"));
	}

	fn on_new_event(&self, event: &Event) {
		self.0(format!("⚡ New event: {}", event));
	}

	fn on_new_block(&self, block_hash: &BlockHash) {
		self.0(format!("⛏️ New block: {block_hash}"));
	}

	fn on_reorg(&self) {
		self.0("🤕 Chain reorg".to_string());
	}
}

impl Default for Logger<'_> {
	fn default() -> Self {
		Self::new(&|message| info!("{}", message))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use std::str::FromStr;

	#[automock]
	trait LoggerCallback {
		fn log(&self, message: String);
	}

	#[fixture]
	fn logger() -> MockLoggerCallback {
		MockLoggerCallback::new()
	}

	#[fixture]
	fn event() -> Event {
		Event::Contribution(ContributionEvent::Validated {
			id: Default::default(),
		})
	}

	#[rstest]
	fn on_new_event(mut logger: MockLoggerCallback, event: Event) {
		logger
			.expect_log()
			.withf(|msg| msg.starts_with("⚡ New event: "))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_new_event(&event);
	}

	#[rstest]
	fn on_connect(mut logger: MockLoggerCallback) {
		logger
			.expect_log()
			.with(eq(String::from("🔗 Indexer `ID` connected")))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_connect(&IndexerId::from("ID"));
	}

	#[rstest]
	fn on_new_block(mut logger: MockLoggerCallback) {
		logger
			.expect_log()
			.with(eq(String::from("⛏️ New block: 0x1234")))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_new_block(&BlockHash::from_str("0x1234").unwrap());
	}

	#[rstest]
	fn on_reorg(mut logger: MockLoggerCallback) {
		logger.expect_log().with(eq(String::from("🤕 Chain reorg"))).return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_reorg();
	}

	#[rstest]
	fn handler_can_be_created_using_default(event: Event) {
		let handler = Logger::default();
		handler.on_new_event(&event);
	}
}
