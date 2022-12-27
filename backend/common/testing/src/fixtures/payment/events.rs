use domain::{Amount, BlockchainNetwork, Currency, EthereumAddress, PaymentEvent, PaymentReceipt};

use super::*;

pub fn payment_processed() -> PaymentEvent {
	PaymentEvent::Processed {
		id: payment_id(),
		receipt_id: payment_receipt_id(),
		amount: Amount::new(
			"500.45".parse().unwrap(),
			Currency::Crypto("USDC".to_string()),
		),
		receipt: PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: EthereumAddress::try_from(recipient_address()).unwrap(),
			transaction_hash: transaction_hash(),
		},
	}
}
