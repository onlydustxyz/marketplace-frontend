use log::info;

use super::*;

type LoggingCallback = dyn Fn(String) + Sync;
pub struct Logger<'a>(&'a LoggingCallback);

impl<'a> Logger<'a> {
	pub fn new(logger: &'a LoggingCallback) -> Self {
		Self(logger)
	}
}

#[async_trait]
impl Observer for Logger<'_> {
	async fn on_connect(&self) {
		self.0(format!("🔗 Indexer connected"));
	}

	async fn on_new_event(&self, event: &ObservedEvent, block_number: u64) {
		self.0(format!("⚡ New event [{block_number}]: {}", event));
	}

	async fn on_new_block(&self, block_hash: &BlockHash, block_number: u64) {
		self.0(format!("⛏️ New block [{block_number}]: {block_hash}"));
	}

	async fn on_reorg(&self) {
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
	fn event() -> ObservedEvent {
		ObservedEvent::default()
	}

	#[rstest]
	async fn on_new_event(mut logger: MockLoggerCallback, event: ObservedEvent) {
		logger
			.expect_log()
			.withf(|msg| msg.starts_with("⚡ New event [0]: "))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_new_event(&event, 0).await;
	}

	#[rstest]
	async fn on_connect(mut logger: MockLoggerCallback) {
		logger
			.expect_log()
			.with(eq(String::from("🔗 Indexer `ID` connected")))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_connect().await;
	}

	#[rstest]
	async fn on_new_block(mut logger: MockLoggerCallback) {
		logger
			.expect_log()
			.with(eq(String::from("⛏️ New block [2222]: 0x1234")))
			.return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_new_block(&BlockHash::from_str("0x1234").unwrap(), 2222).await;
	}

	#[rstest]
	async fn on_reorg(mut logger: MockLoggerCallback) {
		logger.expect_log().with(eq(String::from("🤕 Chain reorg"))).return_const(());
		let logging_callback = move |message| logger.log(message);

		let handler = Logger::new(&logging_callback);
		handler.on_reorg().await;
	}

	#[rstest]
	async fn handler_can_be_created_using_default(event: ObservedEvent) {
		let handler = Logger::default();
		handler.on_new_event(&event, 0).await;
	}
}
