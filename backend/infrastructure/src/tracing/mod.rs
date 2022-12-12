use anyhow::Result;
use opentelemetry::{
	global::shutdown_tracer_provider,
	sdk::trace::{self, RandomIdGenerator, Sampler},
};
use opentelemetry_datadog::ApiVersion;
use serde::Deserialize;
use tracing_subscriber::{layer::SubscriberExt, EnvFilter};

pub struct Tracer;

#[derive(Deserialize)]
pub struct Config {
	ansi: bool,
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

		// Create a tracing layer with the configured tracer
		let telemetry = tracing_opentelemetry::layer().with_tracer(otel_tracer);

		let subscriber = tracing_subscriber::fmt::Subscriber::builder()
			.with_env_filter(EnvFilter::from_default_env())
			.with_ansi(config.ansi)
			.finish()
			.with(telemetry);

		// Trace executed code
		tracing::subscriber::set_global_default(subscriber)?;

		// Init a simple "logger" that converts all `log` records into `tracing` `Event`s
		olog::LogTracer::init()?;

		Ok(Tracer {})
	}
}

impl Drop for Tracer {
	fn drop(&mut self) {
		shutdown_tracer_provider();
	}
}
