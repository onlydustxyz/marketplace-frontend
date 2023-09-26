#![allow(unused)]

pub mod closing_issues;
pub mod commits;
pub mod issues;
pub mod projects;
pub mod pull_requests;
pub mod repos;
pub mod reviews;
pub mod users;

use std::time::Duration;

use rocket::http::Header;

use crate::context::API_KEY;

pub fn api_key_header() -> Header<'static> {
	Header::new("Api-Key", API_KEY)
}

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
