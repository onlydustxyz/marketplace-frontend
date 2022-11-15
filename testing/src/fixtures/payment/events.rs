use super::*;
use marketplace_domain::{BlockchainNetwork, PaymentEvent, PaymentReceipt};

pub fn payment_processed() -> PaymentEvent {
	PaymentEvent::Processed {
		id: payment_id(),
		receipt: PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: recipient_address(),
			transaction_hash: transaction_hash(),
		},
	}
}
