//! A command line utility for refreshing the state of domain aggregates
//!
//! This utility can be used to manually refresh the state of one or more domain aggregates in the system.
//! It utilizes a `Registry` to manage the various `Refresher` implementations for each aggregate type. The user passes in
//! the name of the aggregate to be refreshed, along with a list of aggregate IDs to process.
//!
//! # Usage
//!
//! The utility can be run with the following command:
//!
//! ```sh
//! cargo run --bin refresh -- [aggregate_name] [aggregate_ids] [--all]
//! ```
//!
//! Where:
//!
//! - `aggregate_name` is the name of the aggregate to be refreshed.
//! - `aggregate_ids` is a comma-separated list of IDs for the aggregates to be refreshed.
//! - `--all` is an optional flag that, when present, indicates that all aggregates of the specified type should be refreshed.
//!
//! # Examples
//!
//! Refresh a single `Project` aggregate with ID `1234`:
//!
//! ```sh
//! cargo run --bin refresh -- Project 1234
//! ```
//!
//! Refresh all `Project` aggregates:
//!
//! ```sh
//! cargo run --bin refresh -- Project --all
//! ```
//!
//! # Dependencies
//!
//! - `clap`: Command line argument parsing.
//! - `dotenv`: Load environment variables from a `.env` file.
//! - `anyhow`: Provides `Result` type with automatic error handling.
//! - `infrastructure`: Shared infrastructure code and configuration loading.
//! - `event_listeners`: Contains the `Config` struct and other utilities used by event listeners.
//! - `futures`: Asynchronous futures for multi-threaded processing.
//!
//! # Modules
//!
//! - `cli`: Command line argument parsing.
//! - `refresher`: Contains the `Registry`, `Refresher` trait, and implementations for each aggregate type.
//!
//! # Functions
//!
//! - `main`: Entrypoint of the application. Parses command line arguments, initializes configuration and tracing, and
//! processes the specified aggregates using the appropriate `Refresher` implementation.