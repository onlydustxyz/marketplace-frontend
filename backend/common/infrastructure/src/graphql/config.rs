use derive_getters::Getters;
use derive_more::Constructor;
use serde::Deserialize;
use url::Url;

#[derive(Deserialize, Getters, Constructor)]
pub struct Config {
	base_url: Url,
}
