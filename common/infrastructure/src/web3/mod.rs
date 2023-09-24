pub mod ens;

use serde::Deserialize;

#[derive(Debug, Deserialize, Default, Clone)]
pub struct Config {
	pub url: String,
}
