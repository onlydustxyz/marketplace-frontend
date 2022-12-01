mod info;

pub use opentelemetry;
pub use tracing_opentelemetry;

#[macro_export]
macro_rules! trace_id {
	() => {
		u64::from_be_bytes(
			$crate::opentelemetry::trace::TraceContextExt::span(
				&$crate::tracing_opentelemetry::OpenTelemetrySpanExt::context(
					&tracing::Span::current(),
				),
			)
			.span_context()
			.trace_id()
			.to_bytes()[..8]
				.try_into()
				.unwrap_or_default(),
		)
	};
}

#[macro_export]
macro_rules! span_id {
	() => {
		u64::from_be_bytes(
			$crate::opentelemetry::trace::TraceContextExt::span(
				&$crate::tracing_opentelemetry::OpenTelemetrySpanExt::context(
					&tracing::Span::current(),
				),
			)
			.span_context()
			.span_id()
			.to_bytes(),
		)
	};
}
