use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct Config {
	pub url: String,
	pub pool_max_size: u32,
}
