use std::collections::HashMap;

use serde::Deserialize;

#[derive(Debug, Clone, Default, Deserialize)]
pub struct Config {
	pub base_url: Option<String>,
	pub api_key: String,
	pub currencies: HashMap<String, String>,
}
