use lazy_static::lazy_static;
use log::SetLoggerError;
use tracing::{
	callsite::{self, Callsite},
	dispatcher, field,
	metadata::Kind,
	subscriber, Event, Metadata,
};
use tracing_log::AsTrace;

use crate::{span_id, trace_id};

/// A simple "logger" that converts all log records into `tracing` `Event`s, and
/// adds trace_id and span_id as fields.
pub struct LogTracer(tracing_log::LogTracer);

impl LogTracer {
	/// Sets a `LogTracer` as the global logger for the `log` crate.
	///
	/// Setting a global logger can only be done once.
	///
	/// This will forward all logs to `tracing` and lets the current `Subscriber`
	/// determine if they are enabled.
	pub fn init() -> Result<(), SetLoggerError> {
		let logger = Box::new(LogTracer(tracing_log::LogTracer::default()));
		log::set_boxed_logger(logger)?;
		log::set_max_level(log::LevelFilter::max()); // forward all logs to `tracing` and lets the current `Subscriber` determine if they are enabled.
		Ok(())
	}
}

impl log::Log for LogTracer {
	fn enabled(&self, metadata: &log::Metadata) -> bool {
		self.0.enabled(metadata)
	}

	fn log(&self, record: &log::Record) {
		if self.enabled(record.metadata()) {
			dispatch_record(record);
		}
	}

	fn flush(&self) {}
}

fn dispatch_record(record: &log::Record<'_>) {
	let trace = trace_id!();
	let span = span_id!();

	dispatcher::get_default(|dispatch| {
		let filter_meta = record.as_trace();
		if !dispatch.enabled(&filter_meta) {
			return;
		}

		let (_, keys, meta) = loglevel_to_cs(record.level());

		let log_module = record.module_path();
		let log_file = record.file();
		let log_line = record.line();

		let module = log_module.as_ref().map(|s| s as &dyn field::Value);
		let file = log_file.as_ref().map(|s| s as &dyn field::Value);
		let line = log_line.as_ref().map(|s| s as &dyn field::Value);

		dispatch.event(&Event::new(
			meta,
			&meta.fields().value_set(&[
				(&keys.trace_id, Some(&trace as &dyn field::Value)),
				(&keys.span_id, Some(&span as &dyn field::Value)),
				(&keys.message, Some(record.args() as &dyn field::Value)),
				(&keys.target, Some(&record.target())),
				(&keys.module, module),
				(&keys.file, file),
				(&keys.line, line),
			]),
		));
	});
}

fn loglevel_to_cs(
	level: log::Level,
) -> (
	&'static dyn Callsite,
	&'static Fields,
	&'static Metadata<'static>,
) {
	match level {
		log::Level::Trace => (&TRACE_CS, &*TRACE_FIELDS, &TRACE_META),
		log::Level::Debug => (&DEBUG_CS, &*DEBUG_FIELDS, &DEBUG_META),
		log::Level::Info => (&INFO_CS, &*INFO_FIELDS, &INFO_META),
		log::Level::Warn => (&WARN_CS, &*WARN_FIELDS, &WARN_META),
		log::Level::Error => (&ERROR_CS, &*ERROR_FIELDS, &ERROR_META),
	}
}

struct Fields {
	trace_id: field::Field,
	span_id: field::Field,
	message: field::Field,
	target: field::Field,
	module: field::Field,
	file: field::Field,
	line: field::Field,
}

static FIELD_NAMES: &[&str] = &[
	"trace_id",
	"span_id",
	"message",
	"log.target",
	"log.module_path",
	"log.file",
	"log.line",
];

impl Fields {
	fn new(cs: &'static dyn Callsite) -> Self {
		let fieldset = cs.metadata().fields();
		let trace_id = fieldset.field("trace_id").unwrap();
		let span_id = fieldset.field("span_id").unwrap();
		let message = fieldset.field("message").unwrap();
		let target = fieldset.field("log.target").unwrap();
		let module = fieldset.field("log.module_path").unwrap();
		let file = fieldset.field("log.file").unwrap();
		let line = fieldset.field("log.line").unwrap();
		Fields {
			trace_id,
			span_id,
			message,
			target,
			module,
			file,
			line,
		}
	}
}

macro_rules! log_cs {
	($level:expr, $cs:ident, $meta:ident, $ty:ident) => {
		struct $ty;
		static $cs: $ty = $ty;
		static $meta: Metadata<'static> = Metadata::new(
			"log event",
			"log",
			$level,
			None,
			None,
			None,
			field::FieldSet::new(FIELD_NAMES, callsite::Identifier(&$cs)),
			Kind::EVENT,
		);

		impl callsite::Callsite for $ty {
			fn set_interest(&self, _: subscriber::Interest) {}

			fn metadata(&self) -> &'static Metadata<'static> {
				&$meta
			}
		}
	};
}

log_cs!(tracing::Level::TRACE, TRACE_CS, TRACE_META, TraceCallsite);
log_cs!(tracing::Level::DEBUG, DEBUG_CS, DEBUG_META, DebugCallsite);
log_cs!(tracing::Level::INFO, INFO_CS, INFO_META, InfoCallsite);
log_cs!(tracing::Level::WARN, WARN_CS, WARN_META, WarnCallsite);
log_cs!(tracing::Level::ERROR, ERROR_CS, ERROR_META, ErrorCallsite);

lazy_static! {
	static ref TRACE_FIELDS: Fields = Fields::new(&TRACE_CS);
	static ref DEBUG_FIELDS: Fields = Fields::new(&DEBUG_CS);
	static ref INFO_FIELDS: Fields = Fields::new(&INFO_CS);
	static ref WARN_FIELDS: Fields = Fields::new(&WARN_CS);
	static ref ERROR_FIELDS: Fields = Fields::new(&ERROR_CS);
}

#[cfg(test)]
mod tests {
	use tracing::Level;

	#[test]
	fn log() {
		log::info!("foo");
		log::info!("foo: {}", 3);
		log::info!(target: "foo_events", "foo");
		log::info!(target: "foo_events", "foo: {}", 3);
	}

	#[test]
	fn info_inside_span() {
		let span = tracing::span!(Level::INFO, "my span");
		let _enter = span.enter();
		log();
	}
}
