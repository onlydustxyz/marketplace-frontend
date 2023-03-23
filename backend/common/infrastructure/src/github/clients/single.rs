use octocrab::Octocrab;

use super::{AddHeaders, Config, OctocrabProxy};
pub struct Client(Octocrab);

impl Client {
	pub fn new(config: &Config, personal_access_token: String) -> anyhow::Result<Self> {
		Ok(Self(
			Octocrab::builder()
				.base_url(&config.base_url)?
				.personal_token(personal_access_token)
				.add_headers(&config.headers)?
				.build()?,
		))
	}
}

impl OctocrabProxy for Client {
	fn octocrab(&self) -> &Octocrab {
		&self.0
	}
}
