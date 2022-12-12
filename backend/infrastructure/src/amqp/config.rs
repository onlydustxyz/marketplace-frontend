use derive_getters::Getters;
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	url: String,
}

#[cfg(test)]
impl Config {
	pub fn new(url: String) -> Self {
		Self { url }
	}
}
