/// This module contains code for working with Ethereum identities.
use derive_more::From;
use domain::{EthereumAddress, EthereumIdentity, EthereumName};
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

/// A struct representing an Ethereum identity.
///
/// # Fields
///
/// * `r#type` - The type of this Ethereum identity.
/// * `opt_eth_address` - An optional Ethereum address.
/// * `opt_eth_name` - An optional Ethereum name.
#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct EthereumIdentityInput {
    r#type: EthereumIdentityType,
    opt_eth_address: Option<EthereumAddress>,
    opt_eth_name: Option<EthereumName>,
}

/// An enum representing the type of an Ethereum identity.
///
/// This enum is used to indicate whether an Ethereum identity is represented by an address or a name.
#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum EthereumIdentityType {
    EthereumAddress,
    EthereumName,
}

impl TryFrom<EthereumIdentityInput> for EthereumIdentity {
    type Error = anyhow::Error;

    /// Converts an `EthereumIdentityInput` object to an `EthereumIdentity` object.
    ///
    /// # Arguments
    ///
    /// * `value` - The `EthereumIdentityInput` object to convert.
    ///
    /// # Returns
    ///
    /// An `EthereumIdentity` object if conversion is successful, or an error if not.
    fn try_from(value: EthereumIdentityInput) -> Result<Self, Self::Error> {
        match value.r#type {
            EthereumIdentityType::EthereumAddress => value
                .opt_eth_address
                .ok_or_else(|| {
                    anyhow::anyhow!(
                        "type was set to `ETHEREUM_ADDRESS` without the matching `optEthAddress` field being provided"
                    )
                })
                .map(EthereumIdentity::Address),
            EthereumIdentityType::EthereumName => value
                .opt_eth_name
                .ok_or_else(|| {
                    anyhow::anyhow!(
                        "type was set to `ETHEREUM_NAME` without the matching `optEthName` field being provided"
                    )
                })
                .map(EthereumIdentity::Name),
        }
    }
}