use anyhow::Result;
use marketplace_infrastructure::event_bus;

mod logger;
mod projector;

pub async fn main() -> Result<()> {
	logger::spawn(event_bus::consumer().await?).await?;

	Ok(())
}
