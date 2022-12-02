mod debug;
mod error;
mod info;
mod warn;

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

#[cfg(test)]
#[ctor::ctor]
fn init_tracing_for_tests() {
	use tracing::Level;
	use tracing_subscriber::prelude::__tracing_subscriber_SubscriberExt;

	let tracer = opentelemetry::sdk::export::trace::stdout::new_pipeline()
		.with_writer(Vec::new())
		.install_simple();
	let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);

	let subscriber = tracing_subscriber::fmt::Subscriber::builder()
		.with_max_level(Level::TRACE)
		.finish()
		.with(telemetry);

	// Trace executed code
	tracing::subscriber::set_global_default(subscriber).unwrap();
}
