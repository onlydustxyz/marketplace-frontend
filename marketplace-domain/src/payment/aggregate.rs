use crate::{Aggregate, PaymentEvent, PaymentId};
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}
