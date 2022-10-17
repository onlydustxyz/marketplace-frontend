use anyhow::Result;
use dotenv::dotenv;
use marketplace_infrastructure::logger;
use slog::{Drain, Level, Logger};

fn create_root_logger() -> Logger {
	let drain = logger::default_drain()
		.filter(|record| {
			!(record.level() == Level::Error
				&& record.msg().to_string().starts_with("No matching routes for"))
		})
		.fuse();

	logger::create_root_logger(drain)
}

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();

	let _global_logger_guard = logger::set_global_logger(create_root_logger());

	marketplace_core::main().await
}
