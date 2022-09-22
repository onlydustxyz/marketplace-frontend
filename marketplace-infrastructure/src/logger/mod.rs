use slog::Logger;

pub fn new_global_logger() {
	let global_logger_guard = slog_scope::set_global_logger(get_root_logger());
	global_logger_guard.cancel_reset();
}

fn get_root_logger() -> Logger {
	use slog::{o, Drain, FnValue, Record};
	use slog_async::Async;
	use slog_json::Json;
	use slog_term::{CompactFormat, TermDecorator};
	use std::io::stdout;

	let drain = match std::env::var("LOGS") {
		Ok(logs) if &logs == "terminal" => Async::new(slog_envlogger::new(
			CompactFormat::new(TermDecorator::new().stderr().build()).build().fuse(),
		))
		.chan_size(channel_size())
		.build(),

		_ => Async::new(slog_envlogger::new(
			Json::new(stdout())
				.add_default_keys()
				.add_key_value(o!("location" => FnValue(move |record : &Record| {
						format!("{}:{}:{}", record.file(), record.line(), record.column())
					}),
				))
				.build()
				.fuse(),
		))
		.chan_size(channel_size())
		.build(),
	};
	slog_stdlog::init().unwrap();
	Logger::root(drain.fuse(), o!("version" => env!("CARGO_PKG_VERSION")))
}

fn channel_size() -> usize {
	std::env::var("SLOG_CHANNEL_SIZE").unwrap_or_default().parse().unwrap_or(256)
}
