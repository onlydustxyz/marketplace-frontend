use octocrab::Octocrab;

use super::{AddHeaders, Config};
pub struct Client {
	octocrab: Octocrab,
	config: Config,
}

impl Client {
	pub fn new(config: &Config, personal_access_token: String) -> anyhow::Result<Self> {
		Ok(Self {
			octocrab: Octocrab::builder()
				.base_url(&config.base_url)?
				.personal_token(personal_access_token)
				.add_headers(&config.headers)?
				.build()?,
			config: config.clone(),
		})
	}

	pub fn octocrab(&self) -> &Octocrab {
		&self.octocrab
	}

	pub fn config(&self) -> &Config {
		&self.config
	}
}
