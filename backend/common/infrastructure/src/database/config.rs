use serde::Deserialize;

#[derive(Debug, Deserialize, Default, Clone)]
pub struct Config {
	pub url: String,
	pub pool_max_size: u32,
}
