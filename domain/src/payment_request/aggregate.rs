use crate::{Aggregate, PaymentRequestEvent, PaymentRequestId};
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {}

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct PaymentRequest {
	id: PaymentRequestId,
}

impl Aggregate for PaymentRequest {
	type Event = PaymentRequestEvent;
	type Id = PaymentRequestId;
}
