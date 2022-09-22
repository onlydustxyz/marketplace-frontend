use slog::Drain;
use slog_envlogger::EnvLogger;

pub fn drain<D: Drain>(drain: D) -> EnvLogger<D> {
	EnvLogger::new(drain)
}
