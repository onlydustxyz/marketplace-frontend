mod contact_information;
mod contribution_lifetime;
mod delete_contribution;

use std::{thread, time::Duration};

async fn wait_for_events() {
	tokio::task::spawn(async { thread::sleep(waiting_time()) }).await.unwrap();
}

fn waiting_time() -> Duration {
	let duration = std::env::var("E2E_WAITING_TIME").ok().and_then(|v| v.parse().ok()).unwrap_or(3);
	Duration::from_secs(duration)
}

const STARKONQUEST_ID: u64 = 481932781;
