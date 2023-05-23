//! `event_store` is a Rust module that implements an event sourcing framework.
//!
//! This module is responsible for subscribing to events from a message bus, storing those events, and publishing them to another message bus if needed.
//!
//! # Examples
//!
//! ```
//! use event_store::{Config, IdentifiableAggregate};
//!
//! #[tokio::main]
//! async fn main() -> Result<(), anyhow::Error> {
//!    let config: Config = Config::load("backend/event-store/app.yaml")?;
//!
//!    // Initialize event sourcing module
//!    let inbound_event_bus = bus::consumer(&config.amqp).await?;
//!    let outbound_event_bus = Arc::new(Bus::new(&config.amqp).await?);
//!    let database = Arc::new(DatabaseClient::new(init_pool(&config.database)?));
//!
//!    // Subscribe to inbound bus and store events
//!    inbound_event_bus
//!        .subscribe(|event| {
//!            store(database.clone(), event)
//!                .and_then(|event| publish(event, outbound_event_bus.clone()))
//!        })
//!        .await?;
//!
//!     Ok(())
//! }
//! ```
//!
//! # Features
//!
//! `event_store` provides the following features:
//!
//! - Subscribing to a message bus for incoming events
//! - Storing incoming events in a database
//! - Publishing events to another message bus if needed
//!
//! # Dependencies
//!
//! `event_store` depends on the following packages:
//!
//! - `std::sync::Arc`: Provides the `Arc` struct for creating reference-counted pointers.
//! - `olog::info`: Provides the `info` function for logging information.
//! - `anyhow::Result`: Provides the `Result` type for returning errors.
//! - `backend_domain`: Provides types for working with domain models.
//! - `backend_infrastructure`: Provides infrastructure for the backend.
//! - `dotenv::dotenv`: Provides a function for loading environment variables from a `.env` file.
//! - `event_store`: Provides a domain model for working with event sourcing.
//! - `futures::TryFutureExt`: Provides traits for working with futures.
//! - `serde::Deserialize`: Provides a trait for deserializing JSON data.