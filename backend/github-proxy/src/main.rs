//! This module houses the entrypoint function for the `github-proxy` application.
//!
//! # Example
//!
//! ```bash
//! $ cargo run
//! ```
//!
//! or
//!
//! ```bash
//! $ cargo run --release
//! ```

use std::sync::Arc;

use ::infrastructure::{config, github, tracing::{self, Tracer},};
use anyhow::Result;
use dotenv::dotenv;

#[macro_use]
extern crate rocket;

mod presentation;

use serde::Deserialize;

use self::{github::RoundRobinClient, presentation::http};

/// A struct representing the configuration values for the application.
///
/// # Example
///
/// ```yaml
/// http:
///   host: 127.0.0.1
///   port: 5000
///
/// tracer:
///   enabled: true
///   provider: jaeger
///   sampler_type: const
///   sampler_param: 1.0
///
/// github:
///   host: github.com
///   token: xxxxxx
/// ```
#[derive(Deserialize, Clone)]
pub struct Config {
    http: ::presentation::http::Config,
    tracer: tracing::Config,
    github: github::Config,
}

/// The entrypoint function for the `github-proxy` application.
///
/// # Example
///
/// ```no_run
/// use anyhow::Result;
/// fn main() -> Result<()> {
///     github_proxy::main()
/// }
/// ```
#[rocket::main]
async fn main() -> Result<()> {
    dotenv().ok();
    let config: Config = config::load("backend/github-proxy/app.yaml")?;
    let _tracer = Tracer::init(&config.tracer, "github-proxy")?;

    let github: github::Client = RoundRobinClient::new(&config.github)?.into();

    http::serve(config, Arc::new(github)).await?;

    info!("👋 Gracefully shut down");
    Ok(())
}