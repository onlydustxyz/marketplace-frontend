mod contact_information;
mod contribution_lifetime;
mod delete_contribution;

use std::time::Duration;

use crate::e2e_tests::database::events_count;

async fn wait_for_events(expected_events_count: i64) {
	println!("WAITING for {expected_events_count} events");
	let mut timer = tokio::time::interval(Duration::from_secs(15));

	for _ in 0..20 {
		timer.tick().await;

		if events_count() == expected_events_count {
			return;
		}
	}
	timer.tick().await;

	panic!("Timeout waiting for {expected_events_count} events");
}

const STARKONQUEST_ID: u64 = 481932781;
const STARKONQUEST_TITLE: &str = "starkonquest";
