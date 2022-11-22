use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde_json::Value;

use crate::{Aggregate, PaymentRequestEvent, PaymentRequestId, ProjectId, UserId};

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct PaymentRequest {
	id: PaymentRequestId,
}

impl Aggregate for PaymentRequest {
	type Event = PaymentRequestEvent;
	type Id = PaymentRequestId;
}

impl PaymentRequest {
	pub fn create(
		id: PaymentRequestId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentRequestEvent::Created {
			id,
			project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		}]
	}
}
