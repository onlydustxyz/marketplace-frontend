use serde::{Deserialize, Serialize};

use crate::{BlockchainNetwork, ContractAddress, TransactionHash};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	OnChainPayment {
		network: BlockchainNetwork,
		recipient_address: ContractAddress,
		transaction_hash: TransactionHash,
	},
}
