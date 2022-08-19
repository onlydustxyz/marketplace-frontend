#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Network {
	Starknet(StarknetChain),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum StarknetChain {
	Devnet,
	Goerli,
	Mainnet,
}
