use chrono::Duration;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DurationSeconds};

use crate::{
	Currency, EventSourcable, GithubUserId, PaymentEvent, PaymentId, PaymentWorkItem, ProjectId,
	UserId,
};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
	#[default]
	Active,
	Cancelled,
}

#[serde_as]
#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct State {
	pub id: PaymentId,
	pub project_id: ProjectId,
	pub requested_amount: Decimal,
	pub paid_amount: Decimal,
	pub currency: &'static Currency,
	pub status: Status,
	pub recipient_id: GithubUserId,
	pub requestor_id: UserId,
	pub work_items: Vec<PaymentWorkItem>,
	#[serde_as(as = "Option<DurationSeconds<i64>>")]
	pub duration_worked: Option<Duration>,
}

impl EventSourcable for State {
	type Event = PaymentEvent;
	type Id = PaymentId;

	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			PaymentEvent::Requested {
				id,
				amount,
				recipient_id,
				reason,
				requestor_id,
				duration_worked,
				project_id,
				..
			} => Self {
				id: *id,
				project_id: *project_id,
				requested_amount: *amount.amount(),
				currency: amount.currency(),
				recipient_id: *recipient_id,
				work_items: reason.work_items.clone(),
				requestor_id: *requestor_id,
				duration_worked: *duration_worked,
				..self
			},
			PaymentEvent::Cancelled { id: _ } => Self {
				status: Status::Cancelled,
				..self
			},
			PaymentEvent::Processed { amount, .. } => Self {
				paid_amount: self.paid_amount + amount.amount(),
				..self
			},
			PaymentEvent::InvoiceReceived { .. } | PaymentEvent::InvoiceRejected { .. } => self,
		}
	}
}
