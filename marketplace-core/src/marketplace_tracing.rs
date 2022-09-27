use opentelemetry::{
	sdk::trace::{self, RandomIdGenerator, Sampler},
	trace::{get_active_span, TraceContextExt, Tracer},
	Key,
};
use opentelemetry_datadog::ApiVersion;
use tracing_log::LogTracer;
use tracing_opentelemetry::OpenTelemetrySpanExt;
use tracing_subscriber::{
	fmt::{format, FormatFields},
	layer::SubscriberExt,
	prelude::__tracing_subscriber_field_MakeExt,
	EnvFilter, Registry,
};

use crate::datadog_event_format;

pub fn setup_tracing() {
	// Install a new OpenTelemetry trace pipeline
	let tracer = opentelemetry_datadog::new_pipeline()
		.with_service_name("poc-tracing")
		.with_version(ApiVersion::Version05)
		.with_agent_endpoint("http://localhost:8126")
		.with_trace_config(
			trace::config()
				.with_sampler(Sampler::AlwaysOn)
				.with_id_generator(RandomIdGenerator::default()),
		)
		.install_batch(opentelemetry::runtime::Tokio)
		.unwrap();

	// const ANOTHER_KEY: Key = Key::from_static_str("ex.com/another");
	// tracer.in_span("doing_work", |cx| {
	// 	let span = cx.span();
	// 	// Traced app logic here...
	// 	span.add_event(
	// 		"Nice operation!".to_string(),
	// 		vec![Key::new("bogons").i64(100)],
	// 	);
	// 	span.set_attribute(ANOTHER_KEY.string("yes"));
	// 	log::warn!(
	// 		"YOUYOUUUUU TRACE {}, SPAN {}",
	// 		get_trace_id(),
	// 		get_span_id()
	// 	);
	// });

	// Create a tracing layer with the configured tracer
	let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);

	let subscriber = tracing_subscriber::fmt::Subscriber::builder()
		// subscriber configuration
		.with_env_filter(EnvFilter::from_default_env())
		.with_max_level(tracing::Level::TRACE)
		.with_ansi(false)
		.event_format(datadog_event_format::TraceIdFormat)
		.finish()
		.with(telemetry);

	// Use the tracing subscriber `Registry`, or any other subscriber
	// that impls `LookupSpan`
	// let subscriber = Registry::default()
	// 	//.with(telemetry)
	// 	.with(logs);

	// Trace executed code
	tracing::subscriber::set_global_default(subscriber).unwrap();

	LogTracer::init().unwrap();
	//tracing_log::env_logger::init();
}

pub fn get_tracing_id() -> String {
	let context = tracing::Span::current().context();
	let trace_id = context.span().span_context().trace_id();
	trace_id.to_string()
}

pub fn get_tracing_span_id() -> String {
	let context = tracing::Span::current().context();
	let span_id = context.span().span_context().span_id();
	span_id.to_string()
}

pub fn get_trace_id() -> String {
	get_active_span(|span| {
		let trace_id = span.span_context().trace_id();
		convert_opentelemetry_ids(trace_id.to_string()).to_string()
	})
}

pub fn get_span_id() -> String {
	get_active_span(|span| {
		let span_id = span.span_context().span_id();
		convert_opentelemetry_ids(span_id.to_string()).to_string()
	})
}

fn convert_opentelemetry_ids(id: String) -> u64 {
	if id.len() < 16 {
		return 0;
	}
	u64::from_str_radix(&id[..16], 16).unwrap()
}
