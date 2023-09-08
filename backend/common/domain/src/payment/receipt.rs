use serde::{Deserialize, Serialize};

use crate::{blockchain::*, create_new_id, Iban};

create_new_id!(Id);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	OnChainPayment {
		network: Network,
		recipient_address: evm::Address,
		recipient_ens: Option<evm::Name>,
		transaction_hash: TransactionHash,
	},
	FiatPayment {
		recipient_iban: Iban,
		transaction_reference: String,
	},
}
