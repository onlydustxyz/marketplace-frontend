use reqwest::StatusCode;
use std::{fs::read_to_string, thread, time::Duration};

mod projects;
use projects::*;

mod utils;
use utils::*;

mod contribution;
use contribution::*;

#[tokio::main]
async fn main() {
	add_all_projects().await;

	const STARKONQUEST_ID: u32 = 481932781;
	add_contribution(51, STARKONQUEST_ID, 0, "0x123").await;

	for _ in 0..10 {
		let handle = tokio::spawn(async move {
			compare_jsons(
				list_all_projects().await,
				read_to_string("src/data/projects.json").unwrap(),
			);
		});

		match tokio::join!(handle).0 {
			Ok(_) => return,
			Err(_) => {
				thread::sleep(Duration::from_secs(3));
			},
		}
	}

	assert!(false, "Timeout waiting for transactions to be executed");
}

async fn add_all_projects() {
	add_project("onlydustxyz", "starkonquest").await;
	add_project("onlydustxyz", "starklings").await;
}
