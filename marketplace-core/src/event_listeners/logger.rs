use anyhow::Result;
use marketplace_domain::{Event, Subscriber};
use marketplace_infrastructure::amqp::ConsumableBus;
use tokio::task::JoinHandle;

async fn log(event: Event) -> Result<()> {
	info!(
		"[events] 📨 Received event: {}",
		&serde_json::to_string_pretty(&event)?
	);
	Ok(())
}

pub fn spawn(bus: ConsumableBus) -> JoinHandle<()> {
	tokio::spawn(async move {
		bus.subscribe(log).await.expect("Failed while trying to log received event");
	})
}
