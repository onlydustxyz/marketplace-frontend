use slog::{o, Drain, Logger, Never, SendSyncRefUnwindSafeDrain};
use slog_scope::GlobalLoggerGuard;

use crate::logger::tracing_drain::{get_tracing_span_id, get_tracing_trace_id};

mod r#async;
mod env;
mod terminal;
mod tracing_drain;

pub fn set_default_global_logger() -> GlobalLoggerGuard {
	let logger = create_root_logger(default_drain());
	set_global_logger(logger)
}

pub fn set_global_logger(logger: Logger) -> GlobalLoggerGuard {
	slog_scope::set_global_logger(logger)
}

pub fn default_drain() -> impl Drain<Ok = (), Err = Never> {
	env::drain(tracing_drain::drain(
		r#async::drain(terminal::drain()).fuse(),
	))
}

pub fn create_root_logger<D>(drain: D) -> Logger
where
	D: 'static + SendSyncRefUnwindSafeDrain<Err = Never, Ok = ()> + std::panic::UnwindSafe,
{
	slog_stdlog::init().unwrap();
	Logger::root(
		drain,
		o!("commit" => std::env::var("HEROKU_SLUG_COMMIT").unwrap_or_else(|_| String::from("local_development")),
	"trace_id" => get_tracing_trace_id().to_string()),
	)
}
