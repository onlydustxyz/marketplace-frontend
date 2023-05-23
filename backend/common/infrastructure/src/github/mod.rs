#![allow(missing_docs)]
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

mod issue;
pub use issue::IssueFromOctocrab;

mod service;

mod user;
pub use user::UserFromOctocrab;

mod repo;
pub use repo::OctocrabRepo;

#[derive(Deserialize, Clone, Default)]
/// Configuration options for the GitHub client.
pub struct Config {
    /// Base URL to use for GitHub API requests.
    pub base_url: String,
    /// Personal access tokens to use for GitHub API authentication.
    pub personal_access_tokens: String,
    #[serde(default)]
    /// Additional headers to include in GitHub API requests.
    pub headers: HashMap<String, String>,
    /// Maximum number of API requests to make per call.
    pub max_calls_per_request: Option<PositiveCount>,
}

trait AddHeaders: Sized {
    /// Adds headers to the builder for a new Octocrab instance.
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