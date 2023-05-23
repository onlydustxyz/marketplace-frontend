//! This module contains code for running event listeners.
//!
//! # Examples
//!
//! ```
//! use anyhow::Result;
//!
//! #[tokio::main]
//! async fn main() -> Result<()> {
//!     event_listeners::run().await?;
//!     Ok(())
//! }
//! ```
//!
//! The `event_listeners::run()` function spawns all configured event listeners using the provided configuration and returns a `Result` indicating whether the operation was successful. This operation requires the following dependencies:
//!
//! * `std::sync::Arc`
//! * `anyhow::Result`
//! * `dotenv`
//! * `event_listeners::infrastructure::listeners`
//! * `futures::future::try_join_all`
//! * `infrastructure::{config, database, github, tracing::Tracer}`
//!
//! # Functions
//!
//! All functions in this module return `Result<()>`. If the operation is successful, the result will be `Ok(())`. Otherwise, an error will be returned using the `anyhow` crate.
//!
//! The following functions are available:
//!
//! * `run()` - Spawns all configured event listeners using the provided configuration.
//!
//! # Examples
//!
//! ```
//! use anyhow::Result;
//! use event_listeners::run;
//!
//! #[tokio::main]
//! async fn main() -> Result<()> {
//!     run().await?;
//!     Ok(())
//! }
//! ```
//!
//! This example demonstrates how to call the `run()` function, which spawns all configured event listeners using the provided configuration. The function returns a `Result` indicating whether the operation was successful. This operation requires the following dependencies:
//!
//! * `std::sync::Arc`
//! * `anyhow::Result`
//! * `dotenv`
//! * `event_listeners::infrastructure::listeners`
//! * `futures::future::try_join_all`
//! * `infrastructure::{config, database, github, tracing::Tracer}`

use std::sync::Arc;

use anyhow::Result;
use dotenv::dotenv;
use event_listeners::{infrastructure::listeners, Config};
use futures::future::try_join_all;
use infrastructure::{config, database, github, tracing::Tracer};

/// Spawns all configured event listeners using the provided configuration.
///
/// # Examples
///
/// ```
/// use anyhow::Result;
/// use event_listeners::run;
///
/// #[tokio::main]
/// async fn main() -> Result<()> {
///     run().await?;
///     Ok(())
/// }
/// ```
///
/// This example demonstrates how to call the `run()` function, which spawns all configured event listeners using the provided configuration. The function returns a `Result` indicating whether the operation was successful. This operation requires the following dependencies:
///
/// * `std::sync::Arc`
/// * `anyhow::Result`
/// * `dotenv`
/// * `event_listeners::infrastructure::listeners`
/// * `futures::future::try_join_all`
/// * `infrastructure::{config, database, github, tracing::Tracer}`
pub async fn run() -> Result<()> {
    dotenv().ok();
    let config: Config = config::load("backend/event-listeners/app.yaml")?;
    let _tracer = Tracer::init(config.tracer(), "event-queue-worker")?;

    let reqwest = reqwest::Client::new();
    let database = Arc::new(database::Client::new(database::init_pool(config.database())?));
    let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());

    try_join_all(listeners::spawn_all(&config, reqwest, database, github).await?).await?;

    Ok(())
}