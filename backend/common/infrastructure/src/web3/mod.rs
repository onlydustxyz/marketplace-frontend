pub mod ens;

use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
	pub url: String,
}
