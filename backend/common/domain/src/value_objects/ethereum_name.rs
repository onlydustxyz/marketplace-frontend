#![crate_type = "lib"]
//! `ethereum-name` is a library for working with Ethereum Name Service (ENS) domain names.
//!
//! The core type is `EthereumName`, a newtype wrapper around a `String` that represents an ENS domain name.
//!
//! # Examples
//!
//! ```rust
//! use ethereum_name::EthereumName;
//!
//! let name = EthereumName::new("vitalik.eth".to_owned());
//!
//! assert_eq!(name.as_str(), "vitalik.eth");
//! ```
mod ethereum_name {
    use serde::{Deserialize, Serialize};

    /// Represents an Ethereum Name Service (ENS) domain name.
    #[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
    #[serde(transparent)]
    pub struct EthereumName(String);

    impl EthereumName {
        /// Returns the ENS domain name as a `&str`.
        pub fn as_str(&self) -> &str {
            self.0.as_str()
        }

        /// Creates a new `EthereumName` from a `String`.
        pub fn new(name: String) -> Self {
            EthereumName(name)
        }
    }

    #[juniper::graphql_scalar(description = "An ENS backed domain name")]
    impl<S> GraphQLScalar for EthereumName
    where
        S: juniper::ScalarValue,
    {
        /// Resolves the scalar value and returns a `juniper::Value`.
        fn resolve(&self) -> juniper::Value {
            juniper::Value::scalar(self.0.to_owned())
        }

        /// Converts a `juniper::InputValue` into an `EthereumName`.
        fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
            let str_value = value.as_string_value()?;

            if !str_value.ends_with(".eth") {
                return None;
            }

            Some(EthereumName(str_value.to_string()))
        }

        /// Converts a `juniper::ScalarToken` into a `S`.
        fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
            <String as juniper::ParseScalarValue<S>>::from_str(value)
        }
    }
}

pub use ethereum_name::EthereumName;