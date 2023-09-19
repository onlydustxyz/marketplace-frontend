use serde::{Deserialize, Serialize};

use crate::{blockchain::*, create_new_id, Iban};

create_new_id!(Id);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
	Ethereum {
		recipient_address: evm::Address,
		recipient_ens: Option<evm::Name>,
		transaction_hash: TransactionHash,
	},
	Sepa {
		recipient_iban: Iban,
		transaction_reference: String,
	},
}
