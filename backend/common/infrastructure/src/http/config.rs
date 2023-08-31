use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
	pub base_url: String,
}
