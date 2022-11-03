mod contribution_lifetime;
mod delete_contribution;

use std::time::Duration;

use crate::e2e_tests::database::get_events_count;

async fn wait_for_events(expected_events_count: i64) {
	println!("WAITING for {expected_events_count} events");
	let mut timer = tokio::time::interval(Duration::from_secs(3));

	for _ in 0..15 {
		timer.tick().await;

		if get_events_count() == expected_events_count {
			timer.tick().await; // waiting once more to allow projectors to react
			return;
		}
	}
	timer.tick().await;

	panic!("Timeout waiting for {expected_events_count} events");
}

const STARKONQUEST_ID: u64 = 481932781;
const STARKONQUEST_TITLE: &str = "starkonquest";
