use derive_getters::Getters;
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	url: String,
	connection_retry_interval_ms: u64,
	connection_retry_count: usize,
}

#[cfg(test)]
impl Config {
	pub fn new(
		url: String,
		connection_retry_interval_ms: u64,
		connection_retry_count: usize,
	) -> Self {
		Self {
			url,
			connection_retry_interval_ms,
			connection_retry_count,
		}
	}
}
