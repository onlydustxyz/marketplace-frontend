//! A GraphQL client implementation for sending GraphQL requests to a specified endpoint using `reqwest` as the underlying HTTP client.
//!
//! # Example
//!
//! ```no_run
//! use graphql_client::GraphQLQuery;
//!
//! use my_app::{Client, MyQuery, Config};
//!
//! #[tokio::main]
//! async fn main() -> anyhow::Result<()> {
//!     let config = Config::load()?;
//!     let client = Client::new(&config)?;
//!
//!     let response_data = client
//!         .query::<MyQuery>(MyQuery::build_query(my_query::Variables {
//!             input: "hello".to_string(),
//!         }))
//!         .await?;
//!
//!     println!("{:#?}", response_data);
//!
//!     Ok(())
//! }
//! ```

use anyhow::{anyhow, Result};
use graphql_client::{GraphQLQuery, Response};
use olog::error;
use url::Url;

use super::Config;

/// A GraphQL client for sending GraphQL requests to a specified endpoint using `reqwest` as the underlying HTTP client.
pub struct Client {
    client: reqwest::Client,
    url: Url,
}

impl Client {
    /// Creates a new `Client` instance with the specified configuration.
    ///
    /// # Example
    ///
    /// ```no_run
    /// use my_app::{Client, Config};
    ///
    /// let config = Config::load()?;
    /// let client = Client::new(&config)?;
    ///
    /// // Use the client to send GraphQL requests
    /// ```
    pub fn new(config: &Config) -> Result<Self> {
        Ok(Self {
            client: reqwest::Client::builder().default_headers(config.build_headers()?).build()?,
            url: config.base_url().clone(),
        })
    }

    /// Sends a GraphQL query to the server and returns the response data.
    ///
    /// # Example
    ///
    /// ```no_run
    /// use graphql_client::GraphQLQuery;
    ///
    /// use my_app::{Client, MyQuery};
    ///
    /// #[tokio::main]
    /// async fn main() -> anyhow::Result<()> {
    ///     let config = Config::load()?;
    ///     let client = Client::new(&config)?;
    ///
    ///     let response_data = client
    ///         .query::<MyQuery>(MyQuery::build_query(my_query::Variables {
    ///             input: "hello".to_string(),
    ///         }))
    ///         .await?;
    ///
    ///     println!("{:#?}", response_data);
    ///
    ///     Ok(())
    /// }
    /// ```
    pub async fn query<Q: GraphQLQuery>(&self, variables: Q::Variables) -> Result<Q::ResponseData> {
        let body = Q::build_query(variables);
        let response: Response<Q::ResponseData> =
            self.client.post(self.url.clone()).json(&body).send().await?.json().await?;

        if let Some(errors) = response.errors {
            return Err(anyhow!(
                errors
                    .into_iter()
                    .map(|error| {
                        error!(error = error.to_string(), "GraphQL error");
                        error
                    })
                    .map(|e| e.to_string())
                    .collect::<Vec<_>>()
                    .join(", ")
            ));
        }

        response.data.ok_or_else(|| anyhow!("No data received"))
    }
}