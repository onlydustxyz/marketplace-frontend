//! This module provides a `Config` struct and its methods to manage API configurations.
//!
//! # Examples
//!
//! ```
//! use std::collections::HashMap;
//! use url::Url;
//! use crate::Config;
//!
//! let config = Config::new(
//!     Url::parse("http://api.github.com").unwrap(),
//!     HashMap::new(),
//! );
//!
//! let headers = config.build_headers().expect("Unable to build headers");
//! ```
use std::collections::HashMap;

use anyhow::Result;
use derive_getters::Getters;
use derive_more::Constructor;
use domain::LogErr;
use reqwest::header::HeaderMap;
use serde::Deserialize;
use url::Url;

/// Configuration object for the API client.
#[derive(Deserialize, Getters, Constructor)]
pub struct Config {
    /// Base URL for the API.
    base_url: Url,
    /// Custom headers to include in requests.
    #[serde(default)]
    headers: HashMap<String, String>,
}

impl Config {
    /// Builds `HeaderMap` object from the `headers` field of the `Config` struct.
    ///
    /// # Errors
    ///
    /// Returns an `Err` value if an invalid header or header value is encountered.
    pub fn build_headers(&self) -> Result<HeaderMap> {
        let headers = self
            .headers
            .iter()
            .filter_map(|(header, value)| {
                let value = value.parse().log_err(&format!("Invalid value for header {header}")).ok();
                let header = header.parse().log_err(&format!("Invalid header {header}")).ok();

                match (header, value) {
                    (Some(header), Some(value)) => Some((header, value)),
                    _ => None,
                }
            })
            .collect();

        Ok(headers)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn build_headers_from_config() {
        let config = Config::new(
            "http://api.github.com".parse().unwrap(),
            vec![("x-hasura-admin-secret".to_string(), "test".to_string())]
                .into_iter()
                .collect(),
        );

        let headers = config.build_headers().expect("Unable to build headers");
        assert_eq!(headers.get("x-hasura-admin-secret").unwrap(), "test");
        assert!(headers.get("unexisting").is_none());
    }
}