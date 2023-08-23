use std::time::Duration;

pub mod commits;
pub mod projects;
pub mod repos;
pub mod reviews;
pub mod users;

const MAX_RETRY: i32 = 30;

#[allow(unused)]
pub async fn retry<R, E, F: FnMut() -> std::result::Result<Vec<R>, E>, C: FnMut(&[R]) -> bool>(
	mut callback: F,
	mut check: C,
) -> std::result::Result<Vec<R>, E> {
	let mut results: Vec<R> = vec![];
	let mut count = 0;
	while !check(&results) && count < MAX_RETRY {
		count += 1;
		tokio::time::sleep(Duration::from_secs(1)).await;
		results = callback()?;
	}
	assert_ne!(count, MAX_RETRY);
	Ok(results)
}
