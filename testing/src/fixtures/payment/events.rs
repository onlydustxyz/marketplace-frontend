use super::*;
use domain::{Amount, BlockchainNetwork, Currency, PaymentEvent, PaymentReceipt};

pub fn payment_created() -> PaymentEvent {
	PaymentEvent::Created {
		id: payment_id(),
		request_id: payment_request_id(),
		amount: Amount::new(50000, Currency::Crypto("USDC".to_string())),
		receipt: PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: recipient_address(),
			transaction_hash: transaction_hash(),
		},
	}
}
