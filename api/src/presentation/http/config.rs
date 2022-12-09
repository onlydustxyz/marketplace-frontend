use derive_getters::Getters;
use serde::Deserialize;

#[derive(Clone, Deserialize, Getters)]
pub struct Config {
	api_key: String,
}
