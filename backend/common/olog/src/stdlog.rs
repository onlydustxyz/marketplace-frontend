//! A simple integration between `log` and `tracing`.
//!
//! This crate provides a simple "logger" that converts all log records into
//! `tracing` `Event`s, and adds `trace_id` and `span_id` as fields.
//!
//! ## Usage
//!
//! To use `tracing-log`, add it to your `Cargo.toml`:
//!
//! ```toml
//! [dependencies]
//! tracing-log = "0.1"
//! ```
//!
//! You'll need to set up a `Subscriber` to see the events. Here's a simple example
//! that logs all events with the `tracing_subscriber::FmtSubscriber`:
//!
//! ```rust
//! use tracing_subscriber::{fmt, prelude::*};
//! use tracing_log::LogTracer;
//!
//! fn main() {
//!     LogTracer::init().expect("Failed to install logging");
//!
//!     let subscriber =
//!         fmt::Subscriber::builder().with_max_level(tracing::Level::TRACE).finish();
//!     tracing::subscriber::set_global_default(subscriber).expect("Failed to set subscriber");
//!
//!     tracing::debug!("Hello, world!");
//! }
//! ```
//!
//! ## The `LogTracer`
//!
//! The `LogTracer` is a simple implementation of a `log::Log` that logs all log
//! records as `tracing::Event`s.
//!
//! To use `LogTracer`, simply call `LogTracer::init` after initializing your
//! logger, and all logs will be logged as `Event`s.
//!
//! ## `Event` fields
//!
//! Other than the message, which is logged as the `message` field, each `log::Record`
//! also has several other fields:
//!
//! - `target`: The target of the logging statement.
//! - `module_path`: The module path of the code that generated the log statement.
//! - `file`: The file of the code that generated the log statement.
//! - `line`: The line of the code that generated the log statement.
//!
//! All of these fields are included in the corresponding `Event` as fields with their
//! original names (`target`, `log.module_path`, `log.file`, and `log.line`,
//! respectively). In addition, `trace_id` and `span_id` fields are added with the
//! values of the current trace and span IDs, respectively.