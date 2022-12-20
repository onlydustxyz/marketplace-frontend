use anyhow::Result;
use opentelemetry::{
	global::shutdown_tracer_provider,
	sdk::trace::{self, RandomIdGenerator, Sampler},
};
use opentelemetry_datadog::ApiVersion;
use serde::Deserialize;
use tracing_subscriber::{fmt::Subscriber, layer::SubscriberExt, EnvFilter};

pub struct Tracer;

#[derive(Deserialize)]
pub struct Config {
	ansi: bool,
	json: bool,
	location: bool,
}

impl Tracer {
	pub fn init(config: &Config, service_name: &str) -> Result<Self> {
		// Install a new OpenTelemetry trace pipeline
		let otel_tracer = opentelemetry_datadog::new_pipeline()
			.with_service_name(service_name)
			.with_version(ApiVersion::Version05)
			.with_trace_config(
				trace::config()
					.with_sampler(Sampler::AlwaysOn)
					.with_id_generator(RandomIdGenerator::default()),
			)
			.install_batch(opentelemetry::runtime::Tokio)?;

		if config.json {
			Self::setup_json_subscriber(config, otel_tracer)?;
		} else {
			Self::setup_pretty_subscriber(config, otel_tracer)?;
		};

		// Init a simple "logger" that converts all `log` records into `tracing` `Event`s
		olog::LogTracer::init()?;

		Ok(Tracer {})
	}

	fn setup_pretty_subscriber(
		config: &Config,
		tracer: opentelemetry::sdk::trace::Tracer,
	) -> Result<(), tracing::subscriber::SetGlobalDefaultError> {
		let subscriber = Subscriber::builder()
			.with_env_filter(EnvFilter::from_default_env())
			.with_ansi(config.ansi)
			.with_file(config.location)
			.with_line_number(config.location)
			.finish();

		// Create a tracing layer with the configured tracer
		let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);
		tracing::subscriber::set_global_default(subscriber.with(telemetry))
	}

	fn setup_json_subscriber(
		config: &Config,
		tracer: opentelemetry::sdk::trace::Tracer,
	) -> Result<(), tracing::subscriber::SetGlobalDefaultError> {
		let subscriber = Subscriber::builder()
			.json()
			.with_env_filter(EnvFilter::from_default_env())
			.with_ansi(false)
			.with_file(config.location)
			.with_line_number(config.location)
			.with_current_span(false)
			.with_span_list(false)
			.finish();

		// Create a tracing layer with the configured tracer
		let telemetry = tracing_opentelemetry::layer().with_tracer(tracer);
		tracing::subscriber::set_global_default(subscriber.with(telemetry))
	}
}

impl Drop for Tracer {
	fn drop(&mut self) {
		shutdown_tracer_provider();
	}
}
