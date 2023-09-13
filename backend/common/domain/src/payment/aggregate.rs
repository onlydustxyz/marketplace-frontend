use chrono::{Duration, Utc};
use olog::info;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DurationSeconds};
use thiserror::Error;

use super::Reason;
use crate::{
	Aggregate, Amount, EventSourcable, GithubUserId, PaymentEvent, PaymentId, PaymentReceipt,
	PaymentReceiptId, PaymentWorkItem, ProjectId, UserId,
};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
	#[default]
	Active,
	Cancelled,
}

#[serde_as]
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	pub id: PaymentId,
	pub requested_usd_amount: Decimal,
	pub paid_usd_amount: Decimal,
	pub status: Status,
	pub recipient_id: GithubUserId,
	pub requestor_id: UserId,
	pub work_items: Vec<PaymentWorkItem>,
	#[serde_as(as = "DurationSeconds<i64>")]
	pub duration_worked: Duration,
}

impl Default for Payment {
	fn default() -> Self {
		Self {
			duration_worked: Duration::seconds(0),
			id: Default::default(),
			requested_usd_amount: Default::default(),
			paid_usd_amount: Default::default(),
			status: Default::default(),
			recipient_id: Default::default(),
			requestor_id: Default::default(),
			work_items: Default::default(),
		}
	}
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

impl EventSourcable for Payment {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			PaymentEvent::Requested {
				id,
				amount,
				recipient_id,
				reason,
				requestor_id,
				duration_worked,
				..
			} => Self {
				id: *id,
				requested_usd_amount: *amount.amount(), // TODO: handle currencies
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
				paid_usd_amount: self.paid_usd_amount + amount.amount(), // TODO: handle currencies
				..self
			},
			PaymentEvent::InvoiceReceived { .. } | PaymentEvent::InvoiceRejected { .. } => self,
		}
	}
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Receipt amount exceeds requested amount")]
	Overspent,
	#[error("Payment is not cancellable")]
	NotCancellable,
	#[error("Payment has been cancelled")]
	Cancelled,
}

impl Payment {
	#[cfg_attr(feature = "cargo-clippy", allow(clippy::too_many_arguments))]
	pub fn request(
		id: PaymentId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		duration_worked: Duration,
		reason: Reason,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentEvent::Requested {
			id,
			project_id,
			requestor_id,
			recipient_id,
			amount,
			duration_worked,
			reason,
			requested_at: Utc::now().naive_utc(),
		}]
	}

	pub fn add_receipt(
		&self,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		self.only_active()?;

		// TODO: Handle currency conversion when needed
		if self.paid_usd_amount + amount.amount() > self.requested_usd_amount {
			return Err(Error::Overspent);
		}

		info!(
			amount = amount.amount().to_string(),
			already_paid = self.paid_usd_amount.to_string(),
			requested_amount = self.requested_usd_amount.to_string(),
			"New payment receipt added",
		);

		let events = vec![PaymentEvent::Processed {
			id: self.id,
			amount,
			receipt_id,
			receipt,
			processed_at: Utc::now().naive_utc(),
		}];

		Ok(events)
	}

	pub fn cancel(&self) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		self.only_active()?;
		self.only_cancellable()?;

		info!(id = self.id.to_string(), "Payment request cancelled",);

		let events = vec![PaymentEvent::Cancelled { id: self.id }];

		Ok(events)
	}

	pub fn mark_invoice_as_received(&self) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		self.only_active()?;

		info!(id = self.id.to_string(), "Invoice received",);

		Ok(vec![PaymentEvent::InvoiceReceived {
			id: self.id,
			received_at: Utc::now().naive_utc(),
		}])
	}

	pub fn reject_invoice(&self) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		self.only_active()?;

		info!(id = self.id.to_string(), "Invoice rejected",);

		Ok(vec![PaymentEvent::InvoiceRejected { id: self.id }])
	}

	fn only_active(&self) -> Result<(), Error> {
		match self.status {
			Status::Active => Ok(()),
			Status::Cancelled => Err(Error::Cancelled),
		}
	}

	fn only_cancellable(&self) -> Result<(), Error> {
		if self.paid_usd_amount.is_zero() {
			Ok(())
		} else {
			Err(Error::NotCancellable)
		}
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use assert_matches::assert_matches;
	use rstest::{fixture, rstest};
	use uuid::Uuid;

	use super::*;
	use crate::{blockchain::*, currencies, PaymentReceiptId, UserId};

	pub const CONTRACT_ADDRESSES: [&str; 1] = ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"];

	pub const TRANSACTION_HASHES: [&str; 1] =
		["0x797fb77202901c52094d2544f3631a3535b8ca40009f6a6ac6940b67e6873a4"];

	#[fixture]
	fn payment_receipt_id() -> PaymentReceiptId {
		Uuid::from_str("00000000-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn requestor_id() -> UserId {
		Uuid::from_str("22222222-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("33333333-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn wrong_requestor_id() -> UserId {
		Uuid::from_str("22222222-bbbb-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn recipient_id() -> GithubUserId {
		42u64.into()
	}

	#[fixture]
	fn amount_in_usd() -> u32 {
		420
	}

	#[fixture]
	fn reason() -> Reason {
		Default::default()
	}

	#[fixture]
	fn payment_id() -> PaymentId {
		Uuid::from_str("44444444-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn amount(amount_in_usd: u32) -> Amount {
		Amount::from_decimal(Decimal::new(amount_in_usd as i64, 0), currencies::USD)
	}

	#[fixture]
	fn duration_worked() -> Duration {
		Duration::hours(12)
	}

	#[fixture]
	fn receipt() -> PaymentReceipt {
		PaymentReceipt::OnChainPayment {
			network: Network::Ethereum,
			recipient_address: CONTRACT_ADDRESSES[0].parse().unwrap(),
			recipient_ens: None,
			transaction_hash: TRANSACTION_HASHES[0].parse().unwrap(),
		}
	}

	#[fixture]
	fn payment_cancelled_event(payment_id: PaymentId) -> PaymentEvent {
		PaymentEvent::Cancelled { id: payment_id }
	}

	#[fixture]
	async fn requested_payment(
		payment_id: PaymentId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		duration_worked: Duration,
		reason: Reason,
	) -> Payment {
		let events = Payment::request(
			payment_id,
			project_id,
			requestor_id,
			recipient_id,
			amount,
			duration_worked,
			reason,
		);
		Payment::from_events(&events)
	}

	#[fixture]
	async fn cancelled_payment(#[future] requested_payment: Payment) -> Payment {
		let events = requested_payment.await.cancel().unwrap();
		Payment::from_events(&events)
	}

	#[fixture]
	async fn processed_payment(
		#[future] requested_payment: Payment,
		payment_receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Payment {
		let events = requested_payment
			.await
			.add_receipt(payment_receipt_id, amount, receipt)
			.unwrap();
		Payment::from_events(&events)
	}

	#[rstest]
	async fn test_add_receipt(
		payment_id: PaymentId,
		payment_receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
		#[future] requested_payment: Payment,
	) {
		let events = requested_payment
			.await
			.add_receipt(payment_receipt_id, amount.clone(), receipt.clone())
			.expect("Problem when adding receipt");

		assert_eq!(events.len(), 1);

		assert_matches!(
			events.first().unwrap(),
			PaymentEvent::Processed {
				id,
				receipt_id,
				amount: event_amount,
				receipt: event_receipt,
				processed_at: _
			} => {
				assert_eq!(id, &payment_id);
				assert_eq!(receipt_id, &payment_receipt_id);
				assert_eq!(event_amount, &amount);
				assert_eq!(event_receipt, &receipt);
			}
		);
	}

	#[rstest]
	async fn test_add_receipt_fails_if_overspent(
		payment_receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
		#[future] requested_payment: Payment,
	) {
		let result = requested_payment.await.add_receipt(
			payment_receipt_id,
			Amount::from_decimal(amount.amount() + amount.amount(), amount.currency()),
			receipt,
		);

		assert_matches!(result, Err(Error::Overspent));
	}

	#[rstest]
	async fn test_add_receipt_fails_if_double_spent(
		payment_receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
		#[future] requested_payment: Payment,
	) {
		let payment = requested_payment.await;
		let events = payment
			.add_receipt(payment_receipt_id, amount.clone(), receipt.clone())
			.expect("Problem when adding receipt");

		let payment = payment.apply_events(&events);

		let result = payment.add_receipt(payment_receipt_id, amount, receipt);
		assert_matches!(result, Err(Error::Overspent));
	}

	#[rstest]
	async fn test_add_receipt_fails_if_cancelled(
		payment_receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
		#[future] cancelled_payment: Payment,
	) {
		let result = cancelled_payment.await.add_receipt(payment_receipt_id, amount, receipt);

		assert_matches!(result, Err(Error::Cancelled));
	}

	#[rstest]
	async fn test_cancel(
		#[future] requested_payment: Payment,
		payment_cancelled_event: PaymentEvent,
	) {
		let events = requested_payment.await.cancel().expect("Problem when cancelling payment");

		assert_eq!(events, vec![payment_cancelled_event]);
	}

	#[rstest]
	async fn test_cancel_fails_if_cancelled(#[future] cancelled_payment: Payment) {
		let result = cancelled_payment.await.cancel();

		assert_matches!(result, Err(Error::Cancelled));
	}

	#[rstest]
	async fn test_cancel_fails_if_processed(#[future] processed_payment: Payment) {
		let result = processed_payment.await.cancel();

		assert_matches!(result, Err(Error::NotCancellable));
	}

	#[rstest]
	async fn test_request(
		payment_id: PaymentId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		duration_worked: Duration,
		reason: Reason,
	) {
		let before = Utc::now();
		let events = Payment::request(
			payment_id,
			project_id,
			requestor_id,
			recipient_id,
			amount.clone(),
			duration_worked,
			reason.clone(),
		);
		let after = Utc::now();

		assert_eq!(events.len(), 1);
		let requested_at = match &events[0] {
			PaymentEvent::Requested { requested_at, .. } => *requested_at,
			_ => panic!("Should be a Payment::Requested event"),
		};

		assert!(requested_at >= before.naive_utc());
		assert!(requested_at <= after.naive_utc());

		assert_eq!(
			events[0],
			PaymentEvent::Requested {
				id: payment_id,
				project_id,
				requestor_id,
				recipient_id,
				amount,
				duration_worked,
				reason,
				requested_at,
			}
		);
	}

	#[rstest]
	fn test_event_sourced(payment_id: PaymentId, project_id: ProjectId) {
		let event = PaymentEvent::Requested {
			id: payment_id,
			project_id,
			requestor_id: Default::default(),
			recipient_id: Default::default(),
			amount: Amount::from_decimal(Decimal::ZERO, Default::default()),
			duration_worked: Duration::hours(0),
			reason: Default::default(),
			requested_at: Default::default(),
		};

		let payment = Payment::from_events(&[event]);
		assert_eq!(payment.id, payment_id);
	}
}
