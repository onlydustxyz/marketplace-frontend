use std::fmt::Display;

use opentelemetry::trace::{get_active_span, SpanId, TraceContextExt, TraceId};
use rocket::Data;
use slog::{b, o, Drain, OwnedKV, OwnedKVList};
use tracing_opentelemetry::OpenTelemetrySpanExt;

pub fn drain<D: Drain>(drain: D) -> OpenTelemetryDrain<D> {
	OpenTelemetryDrain::new(drain)
}

pub struct OpenTelemetryDrain<T: Drain> {
	drain: T,
}

impl<T: Drain> OpenTelemetryDrain<T> {
	fn new(drain: T) -> Self {
		Self { drain }
	}
}

impl<T: Drain> Drain for OpenTelemetryDrain<T>
where
	T: Drain<Ok = ()>,
{
	type Err = T::Err;
	type Ok = ();

	fn log(
		&self,
		record: &slog::Record,
		kv_list: &slog::OwnedKVList,
	) -> std::result::Result<Self::Ok, Self::Err> {
		println!("trace_id = {}", get_tracing_trace_id());
		println!("span_id = {}", get_tracing_span_id());
		// let static_record = slog::RecordStatic {
		// 	location: record.location(),
		// 	tag: record.tag(),
		// 	level: record.level(),
		// };
		// let span_id = get_tracing_span_id().to_string();
		// let kv = o!("span_id"=> "");
		// let r = slog::Record::new(&static_record, record.msg(), kv);
		self.drain.log(record, kv_list)
	}
}

pub fn get_tracing_trace_id() -> DatadogId {
	let context = tracing::Span::current().context();
	let trace_id = context.span().span_context().trace_id();
	trace_id.into()
}

pub fn get_tracing_span_id() -> DatadogId {
	let context = tracing::Span::current().context();
	let span_id = context.span().span_context().span_id();
	span_id.into()
}

pub struct DatadogId(u64);

impl From<TraceId> for DatadogId {
	fn from(value: TraceId) -> Self {
		let bytes: [u8; 8] = value.to_bytes()[..8].try_into().unwrap_or_default();
		DatadogId(u64::from_be_bytes(bytes))
	}
}

impl From<SpanId> for DatadogId {
	fn from(value: SpanId) -> Self {
		let bytes: [u8; 8] = value.to_bytes();
		DatadogId(u64::from_be_bytes(bytes))
	}
}

impl std::fmt::Display for DatadogId {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.write_fmt(format_args!("{}", self.0))
	}
}

impl std::fmt::Debug for DatadogId {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		f.write_fmt(format_args!("{}", self.0))
	}
}
