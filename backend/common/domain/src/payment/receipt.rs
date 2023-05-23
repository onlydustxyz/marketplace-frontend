/// Utility module for blockchain receipts
use derive_more::{Display, From, Into};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{BlockchainNetwork, EthereumAddress, Iban, TransactionHash};

/// Identifier for a blockchain receipt
#[derive(
    Debug,
    Default,
    Copy,
    Clone,
    PartialEq,
    Eq,
    Hash,
    Serialize,
    Deserialize,
    Display,
    From,
    Into,
    AsExpression,
    FromToSql,
    FromSqlRow,
)]
#[sql_type = "diesel::sql_types::Uuid"]
pub struct Id(Uuid);

impl Id {
    /// Generates a new unique identifier for a receipt
    pub fn new() -> Self {
        Self(Uuid::new_v4())
    }
}

/// Enumeration for the types of receipts
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Receipt {
    /// Represents a blockchain payment with transaction hash
    OnChainPayment {
        network: BlockchainNetwork,
        recipient_address: EthereumAddress,
        transaction_hash: TransactionHash,
    },
    /// Represents a fiat payment with IBAN and transaction reference
    FiatPayment {
        recipient_iban: Iban,
        transaction_reference: String,
    },
}