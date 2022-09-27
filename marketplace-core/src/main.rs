mod datadog_event_format;
mod marketplace_tracing;
use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::logger;
use slog::{Drain, Level, Logger};
use std::sync::Arc;

use crate::marketplace_tracing::{get_span_id, get_trace_id, get_tracing_id, get_tracing_span_id};

#[macro_use]
extern crate rocket;

fn create_root_logger() -> Logger {
	let drain = logger::default_drain()
		.filter(|record| {
			!(record.level() == Level::Error
				&& record.msg().to_string().starts_with("No matching routes for"))
		})
		.fuse();

	logger::create_root_logger(drain)
}

#[tracing::instrument]
fn foo(bar: String) -> String {
	// tracing::warn_span!("New WARN span?");
	// tracing::warn!("This is my WARN trace!");
	// let a = get_tracing_id();
	// let b = get_tracing_span_id();
	// log::warn!("BBBBBBBBBBB! TRACE {}, SPAN {}", a, b);
	log::error!("to");
	fee(bar) + " smith"
}

#[tracing::instrument]
fn fee(bar: String) -> String {
	// tracing::warn_span!("New WARN span?");
	// tracing::warn!("This is my WARN trace!");
	// let a = get_tracing_id();
	// let b = get_tracing_span_id();
	// log::warn!("BBBBBBBBBBB! TRACE {}, SPAN {}", a, b);
	log::info!("kyo");
	tracing::event!(
		tracing::Level::INFO,
		msg = "message",
		answer = 42,
		question = "life, the universe, and everything",
		"what?"
	);
	bar + " PhD"
}

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	marketplace_tracing::setup_tracing();
	//let _global_logger_guard = logger::set_global_logger(create_root_logger());

	tracing::info!("This is my INFO trace!");
	log::info!("This is my INFO log!");
	foo("john".to_string());
	marketplace_core::main().await
}
