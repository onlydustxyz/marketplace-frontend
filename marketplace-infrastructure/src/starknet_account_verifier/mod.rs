use starknet::providers::SequencerGatewayProvider;
use url::Url;

mod account_verifier;
pub use account_verifier::{Signature as StarknetSignature, SignedData as StarknetSignedData};

mod hex_field_element;
pub use hex_field_element::{Error as HexFieldElementError, HexFieldElement};

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
