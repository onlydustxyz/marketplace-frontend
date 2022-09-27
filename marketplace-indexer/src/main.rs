use dotenv::dotenv;
use marketplace_infrastructure::logger;

#[tokio::main]
pub async fn main() {
	dotenv().ok();
	logger::set_default_global_logger().cancel_reset();

	marketplace_indexer::main().await
}
