#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub enum Network {
	#[default]
	Starknet,
}

#[cfg(test)]
mod test {
	use super::*;

	#[test]
	fn network_default_to_starknet() {
		assert_eq!(Network::Starknet, Network::default())
	}
}
