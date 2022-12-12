use derive_getters::Getters;
use derive_more::Constructor;
use serde::Deserialize;

#[derive(Deserialize, Getters, Constructor)]
pub struct Config {
	url: String,
	pool_max_size: u32,
}
