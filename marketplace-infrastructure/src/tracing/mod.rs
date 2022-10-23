use opentelemetry::sdk::trace::{self, RandomIdGenerator, Sampler};
use opentelemetry_datadog::ApiVersion;
use tracing_log::LogTracer;
use tracing_subscriber::{layer::SubscriberExt, EnvFilter};

mod datadog_event_format;

pub fn setup_tracing() {
	// Install a new OpenTelemetry trace pipeline
	let tracer = opentelemetry_datadog::new_pipeline()
		.with_service_name("poc-tracing")
		.with_version(ApiVersion::Version05)
		.with_trace_config(
			trace::config()
				.with_sampler(Sampler::AlwaysOn)
				.with_id_generator(RandomIdGenerator::default()),
		)
		.install_batch(opentelemetry::runtime::Tokio)
		.unwrap();

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

	// Trace executed code
	tracing::subscriber::set_global_default(subscriber).unwrap();

	LogTracer::init().unwrap();
}
