use slog::{o, Drain, Logger};

mod r#async;
mod env;
mod json;
mod terminal;

pub fn init() {
	slog_scope::set_global_logger(create()).cancel_reset();
}

fn create() -> Logger {
	let async_drain = match std::env::var("LOGS") {
		Ok(logs) if &logs == "terminal" => r#async::drain(terminal::drain()),
		_ => r#async::drain(json::drain()),
	}
	.fuse();

	slog_stdlog::init().unwrap();
	Logger::root(
		env::drain(async_drain),
		o!("version" => env!("CARGO_PKG_VERSION")),
	)
}
