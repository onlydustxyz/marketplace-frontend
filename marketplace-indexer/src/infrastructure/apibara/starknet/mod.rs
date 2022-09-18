mod events;
mod indexing_service;

mod bytes;
use bytes::*;

pub fn node_url() -> String {
	std::env::var("APIBARA_STARKNET_NODE_URL")
		.unwrap_or_else(|_| String::from("goerli.starknet.stream.apibara.com:443"))
}
