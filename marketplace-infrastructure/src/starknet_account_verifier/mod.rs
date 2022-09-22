use std::convert::TryFrom;

use anyhow::anyhow;
use marketplace_domain::{ContributorAccount, HexPrefixedString};
use starknet::{core::types::FieldElement, providers::SequencerGatewayProvider};
use url::Url;

mod account_verifier;
pub use account_verifier::SignedData as StarknetSignedData;

pub struct StarkNetClient {
	pub sequencer: SequencerGatewayProvider,
}

impl StarkNetClient {
	pub fn new() -> Self {
		StarkNetClient {
			sequencer: sequencer(),
		}
	}
}

fn sequencer() -> SequencerGatewayProvider {
	match std::env::var("NETWORK") {
		Ok(network) if network == *"devnet" => SequencerGatewayProvider::new(
			Url::parse("http://127.0.0.1:5050/gateway").unwrap(),
			Url::parse("http://127.0.0.1:5050/feeder_gateway").unwrap(),
		),
		Ok(network) if network == *"alpha-goerli" =>
			SequencerGatewayProvider::starknet_alpha_goerli(),
		Ok(network) if network == *"alpha-mainnet" =>
			SequencerGatewayProvider::starknet_alpha_mainnet(),
		_ => SequencerGatewayProvider::starknet_alpha_goerli(), // Default to goerli
	}
}

struct HexFieldElement(FieldElement);

impl From<HexFieldElement> for FieldElement {
	fn from(value: HexFieldElement) -> Self {
		value.0
	}
}

impl TryFrom<Vec<u8>> for HexFieldElement {
	type Error = anyhow::Error;

	fn try_from(value: Vec<u8>) -> Result<Self, Self::Error> {
		let value: [u8; 32] = value.try_into().map_err(|v| anyhow!("{:?}", v))?;
		Ok(HexFieldElement(
			FieldElement::from_bytes_be(&value).map_err(anyhow::Error::msg)?,
		))
	}
}

impl TryFrom<ContributorAccount> for HexFieldElement {
	type Error = anyhow::Error;

	fn try_from(value: ContributorAccount) -> Result<Self, Self::Error> {
		let hex_string: HexPrefixedString = value.into();
		let bytes = hex_string.to_bytes();
		HexFieldElement::try_from(bytes).map_err(anyhow::Error::from)
	}
}
