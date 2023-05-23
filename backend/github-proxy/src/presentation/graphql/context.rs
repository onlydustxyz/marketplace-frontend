/// This module defines a context struct used by the entire application.
///
/// The context struct holds all the necessary information needed to perform
/// operations that require interaction with external systems like GitHub.
///
/// # Fields
///
/// * `github_pat`: An optional Github Personal Access Token.
/// * `config`: Application configuration struct.
/// * `default_github_service`: An Arc pointer referencing the default Github service.
///
/// # Example
///
/// ```
/// use std::sync::Arc;
/// use domain::GithubService;
/// use infrastructure::github;
/// use olog::error;
///
/// use super::Error;
/// use crate::{presentation::http::guards::OptionGithubPat, Config, Context};
///
/// let config = Config::default();
/// let default_github_service = Arc::new(github::SingleClient::new(&config.github, "").into());
/// let ctx = Context::new(None, config, default_github_service);
///
/// let result = ctx.github_service();
/// if let Err(e) = result {
///     panic!("An error occurred: {:?}", e);
/// }
/// ```
use std::sync::Arc;

use domain::GithubService;
use infrastructure::github;
use olog::error;

use super::Error;
use crate::{presentation::http::guards::OptionGithubPat, Config};

pub struct Context {
    pub github_pat: Option<String>,
    config: Config,
    default_github_service: Arc<dyn GithubService>,
}

impl Context {
    /// Constructs a new `Context`.
    ///
    /// # Arguments
    ///
    /// * `github_pat`: An optional Github Personal Access Token.
    /// * `config`: Application configuration struct.
    /// * `default_github_service`: An Arc pointer referencing the default Github service.
    ///
    /// # Returns
    ///
    /// A new instance of `Context`.
    pub fn new(
        github_pat: OptionGithubPat,
        config: Config,
        default_github_service: Arc<dyn GithubService>,
    ) -> Self {
        Self {
            github_pat: github_pat.into(),
            config,
            default_github_service,
        }
    }

    /// Returns a Github service that uses the user's Github Personal Access Token.
    ///
    /// # Returns
    ///
    /// An `Arc` pointer referencing a new instance of `github::Client`.
    pub fn github_service_with_user_pat(&self) -> Result<Arc<dyn GithubService>, Error> {
        let client: Arc<dyn GithubService> = match self.github_pat.clone() {
            Some(token) => {
                let client: github::Client = github::SingleClient::new(&self.config.github, token)
                    .map_err(|error| {
                        error!(
                            error = format!("{error:?}"),
                            "Error while building Github client"
                        );
                        Error::InternalError(error)
                    })?
                    .into();
                Arc::new(client)
            }
            None => self.default_github_service.clone(),
        };

        Ok(client)
    }

    /// Returns the default Github service.
    ///
    /// # Returns
    ///
    /// An `Arc` pointer referencing the default Github service.
    pub fn github_service(&self) -> Result<Arc<dyn GithubService>, Error> {
        Ok(self.default_github_service.clone())
    }
}

impl juniper::Context for Context {}