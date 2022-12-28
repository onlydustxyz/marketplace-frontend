pub mod ens;

use serde::Deserialize;

#[derive(Deserialize)]
pub struct Config {
	url: String,
}
