mod contact_information;
mod contribution_lifetime;
mod delete_contribution;

use std::time::Duration;

use crate::e2e_tests::database::events_count;

async fn wait_for_events(expected_events_count: i64) {
	println!("WAITING for {expected_events_count} events");
	let mut timer = tokio::time::interval(Duration::from_secs(3));

	for _ in 0..20 {
		timer.tick().await;

		if events_count() == expected_events_count {
			return;
		}
	}

	panic!("Timeout waiting for {expected_events_count} events");
}

const STARKONQUEST_ID: u64 = 481932781;
const STARKONQUEST_TITLE: &str = "starkonquest";

fn hex_str_to_u64(hex: &str) -> u64 {
	u64::from_str_radix(hex.trim_start_matches("0x"), 16).unwrap()
}
