use super::utils::BACKEND_BASE_URI;
use rstest::*;
use std::time::Duration;
use tokio::{
	task::{spawn, JoinHandle},
	time::interval,
};

#[fixture]
#[once]
fn marketplace_api() -> JoinHandle<()> {
	spawn(::marketplace_core::main())
}

#[fixture]
pub async fn marketplace_api_ready<'a>(marketplace_api: &'a JoinHandle<()>) -> &'a JoinHandle<()> {
	let mut timer = interval(Duration::from_millis(500));

	for _ in 0..10 {
		timer.tick().await;

		match reqwest::get(format!("{BACKEND_BASE_URI}/openapi.json")).await {
			Ok(response) if response.status() == reqwest::StatusCode::OK => return marketplace_api,
			_ => (),
		}
	}

	panic!("Timeout waiting for backend to be ready")
}

#[fixture]
#[once]
pub fn marketplace_indexer() -> JoinHandle<()> {
	spawn(::marketplace_indexer::main())
}
