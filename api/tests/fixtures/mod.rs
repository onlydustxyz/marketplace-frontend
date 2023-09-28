#![allow(unused)]

pub mod job;

use std::time::Duration;

pub async fn retry<R, E, F: FnMut() -> std::result::Result<Vec<R>, E>, C: FnMut(&[R]) -> bool>(
	mut callback: F,
	mut check: C,
) -> std::result::Result<Vec<R>, E> {
	let mut results: Vec<R> = vec![];
	while !check(&results) {
		tokio::time::sleep(Duration::from_secs(1)).await;
		results = callback()?;
	}
	Ok(results)
}
