use derive_getters::Getters;
use derive_more::Constructor;
use serde::Deserialize;

#[derive(Deserialize, Getters, Constructor)]
pub struct Config {
	pub url: String,
	pub pool_max_size: u32,
}
