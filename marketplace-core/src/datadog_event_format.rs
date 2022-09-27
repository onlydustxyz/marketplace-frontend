use opentelemetry::trace::{SpanId, TraceContextExt, TraceId};
use tracing::{Event, Subscriber};
use tracing_opentelemetry::OtelData;
use tracing_subscriber::{
	fmt::{
		format::{self, FormatEvent, FormatFields},
		FmtContext, FormattedFields,
	},
	registry::{LookupSpan, SpanRef},
};

pub struct TraceIdFormat;

impl<C, N> FormatEvent<C, N> for TraceIdFormat
where
	C: Subscriber + for<'lookup> LookupSpan<'lookup>,
	N: for<'a> FormatFields<'a> + 'static,
{
	fn format_event(
		&self,
		ctx: &FmtContext<'_, C, N>,
		mut writer: format::Writer<'_>,
		event: &Event<'_>,
	) -> std::fmt::Result {
		// Format values from the event's's metadata:
		let metadata = event.metadata();
		write!(&mut writer, "{} {}: ", metadata.level(), metadata.target())?;

		// Format all the spans in the event's span context.
		if let Some(scope) = ctx.event_scope() {
			for span in scope.from_root() {
				write!(writer, "{}", span.name())?;

				// `FormattedFields` is a formatted representation of the span's
				// fields, which is stored in its extensions by the `fmt` layer's
				// `new_span` method. The fields will have been formatted
				// by the same field formatter that's provided to the event
				// formatter in the `FmtContext`.
				let ext = span.extensions();
				let fields = &ext.get::<FormattedFields<N>>().expect("will never be `None`");

				// Skip formatting the fields if the span had no fields.
				if !fields.is_empty() {
					write!(writer, "{{{}}}", fields)?;
				}
				write!(writer, ": ")?;
			}
		}

		// Write fields on the event
		ctx.field_format().format_fields(writer.by_ref(), event)?;

		// Write trace_id and span_id
		if let Some(ref span_ref) = ctx.lookup_current() {
			if let Some(trace_info) = lookup_trace_info(span_ref) {
				write!(writer, " trace_id={}", &trace_info.trace_id)?;
				write!(writer, " span_id={}", &trace_info.span_id)?;
			}
		}

		writeln!(writer)
	}
}

pub struct TraceInfo {
	pub trace_id: DatadogId,
	pub span_id: DatadogId,
}

fn lookup_trace_info<S>(span_ref: &SpanRef<S>) -> Option<TraceInfo>
where
	S: Subscriber + for<'a> LookupSpan<'a>,
{
	span_ref.extensions().get::<OtelData>().map(|o| TraceInfo {
		trace_id: o
			.builder
			.trace_id
			.unwrap_or(o.parent_cx.span().span_context().trace_id())
			.into(),
		span_id: o.builder.span_id.unwrap_or(SpanId::INVALID).into(),
	})
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
