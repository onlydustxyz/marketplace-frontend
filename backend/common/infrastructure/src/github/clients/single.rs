/// A client that connects to the GitHub API using Octocrab and a personal access token.
pub struct Client {
    /// The Octocrab instance used for connecting to the GitHub API.
    octocrab: Octocrab,
    /// The configuration settings for the client.
    config: Config,
}

impl Client {
    /// Creates a new Client instance with the specified configuration and personal access token.
    ///
    /// # Arguments
    ///
    /// * `config` - The configuration settings for the client.
    /// * `personal_access_token` - A personal access token for authenticating with the GitHub API.
    ///
    /// # Errors
    ///
    /// Returns an error if the Octocrab instance cannot be built.
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

    /// Returns a reference to the Octocrab instance used by the client.
    pub fn octocrab(&self) -> &Octocrab {
        &self.octocrab
    }

    /// Returns a reference to the configuration settings for the client.
    pub fn config(&self) -> &Config {
        &self.config
    }
}