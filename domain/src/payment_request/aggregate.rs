use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde_json::Value;

use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct PaymentRequest {
	id: PaymentRequestId,
	project_id: ProjectId,
	requestor_id: UserId,
	recipient_id: UserId,
	amount_in_usd: u32,
	reason: Value,
}

impl Aggregate for PaymentRequest {
	type Event = ProjectEvent;
	type Id = PaymentRequestId;
}
