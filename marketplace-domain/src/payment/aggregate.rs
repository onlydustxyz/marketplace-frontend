use crate::{Aggregate, PaymentEvent, PaymentId, PaymentReceipt};
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
	pub fn mark_as_processed(
		id: PaymentId,
		receipt: PaymentReceipt,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentEvent::Processed { id, receipt }]
	}
}
