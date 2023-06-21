use serde::{Deserialize, Serialize};

use crate::{
	create_new_id, BlockchainNetwork, EthereumAddress, EthereumName, Iban, TransactionHash,
};

create_new_id!(Id);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	OnChainPayment {
		network: BlockchainNetwork,
		recipient_address: EthereumAddress,
		recipient_ens: Option<EthereumName>,
		transaction_hash: TransactionHash,
	},
	FiatPayment {
		recipient_iban: Iban,
		transaction_reference: String,
	},
}
