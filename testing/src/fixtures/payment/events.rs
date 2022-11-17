use super::*;
use domain::{BlockchainNetwork, PaymentEvent, PaymentReceipt};

pub fn payment_created() -> PaymentEvent {
	PaymentEvent::Created {
		id: payment_id(),
		request_id: payment_request_id(),
		receipt: PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: recipient_address(),
			transaction_hash: transaction_hash(),
		},
	}
}
