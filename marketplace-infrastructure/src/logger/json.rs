use slog::{o, Drain, FnValue, Record};
use slog_json::Json;
use std::io::stdout;

pub fn drain() -> impl Drain<Ok = (), Err = slog::Never> {
	Json::new(stdout())
		.add_default_keys()
		.add_key_value(o!("location" => FnValue(move |record : &Record| {
				format!("{}:{}:{}", record.file(), record.line(), record.column())
			}),
		))
		.build()
		.fuse()
}
