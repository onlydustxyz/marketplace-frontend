use crate::{Aggregate, PaymentEvent, PaymentId, PaymentReceipt, PaymentRequestId};
use serde::{Deserialize, Serialize};

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
		receipt: PaymentReceipt,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentEvent::Created {
			id,
			request_id,
			receipt,
		}]
	}
}
