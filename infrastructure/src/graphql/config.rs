use derive_getters::Getters;
use serde::Deserialize;

#[derive(Deserialize, Getters)]
pub struct Config {
	url: String,
	admin_secret: String,
}

#[cfg(test)]
impl Config {
	pub fn new(url: String, admin_secret: String) -> Self {
		Self { url, admin_secret }
	}
}
