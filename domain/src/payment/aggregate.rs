use crate::{Aggregate, PaymentEvent, PaymentId, PaymentReceipt, PaymentRequestId};
use serde::{Deserialize, Serialize};

use super::amount::Amount;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

impl Payment {
	pub fn create(
		id: PaymentId,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentEvent::Created {
			id,
			amount,
			request_id,
			receipt,
		}]
	}
}
