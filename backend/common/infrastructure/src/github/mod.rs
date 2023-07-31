use std::collections::HashMap;

use domain::PositiveCount;
use octocrab::OctocrabBuilder;
use serde::Deserialize;

mod contributors;
pub use contributors::Contributors;

mod clients;
pub use clients::{Client, RoundRobinClient, SingleClient};

mod error;
pub use error::Error;

pub mod issue;
pub mod pull_request;

mod service;

mod user;
pub use user::UserFromOctocrab;

mod repo;
pub use repo::OctocrabRepo;

#[derive(Debug, Deserialize, Clone, Default)]
pub struct Config {
	pub base_url: String,
	pub personal_access_tokens: String,
	#[serde(default)]
	pub headers: HashMap<String, String>,
	pub max_calls_per_request: Option<PositiveCount>,
}

trait AddHeaders: Sized {
	fn add_headers(self, headers: &HashMap<String, String>) -> anyhow::Result<Self>;
}

impl AddHeaders for OctocrabBuilder {
	fn add_headers(mut self, headers: &HashMap<String, String>) -> anyhow::Result<Self> {
		for (key, value) in headers {
			self = self.add_header(key.parse()?, value.clone());
		}
		Ok(self)
	}
}
