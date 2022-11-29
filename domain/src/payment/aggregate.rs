#[cfg_attr(test, mockall_double::double)]
use crate::specifications::UserExists;
use crate::{
	specifications, Aggregate, AggregateRoot, Amount, BudgetId, EventSourcable, PaymentEvent,
	PaymentId, PaymentReceipt, PaymentReceiptId, UserId,
};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use thiserror::Error;
use tracing::info;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
	requested_usd_amount: Decimal,
	paid_usd_amount: Decimal,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

impl EventSourcable for Payment {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			PaymentEvent::Requested {
				id, amount_in_usd, ..
			} => Self {
				id: *id,
				requested_usd_amount: Decimal::new(*amount_in_usd as i64, 0),
				..self
			},
			PaymentEvent::Processed { amount, .. } => Self {
				paid_usd_amount: self.paid_usd_amount + amount.amount(),
				..self
			},
		}
	}
}

impl AggregateRoot for Payment {}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Requestor not found")]
	RequestorNotFound,
	#[error("Recipient not found")]
	RecipientNotFound,
	#[error("Receipt amount exceeds requested amount")]
	Overspent,
	#[error(transparent)]
	Specification(specifications::Error),
}

impl Payment {
	#[cfg_attr(feature = "cargo-clippy", allow(clippy::too_many_arguments))]
	pub async fn request(
		user_exists_specification: &UserExists,
		id: PaymentId,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if !user_exists_specification
			.is_satisfied_by(&requestor_id)
			.await
			.map_err(Error::Specification)?
		{
			return Err(Error::RequestorNotFound);
		}

		if !user_exists_specification
			.is_satisfied_by(&recipient_id)
			.await
			.map_err(Error::Specification)?
		{
			return Err(Error::RecipientNotFound);
		}

		Ok(vec![PaymentEvent::Requested {
			id,
			budget_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		}])
	}

	pub fn add_receipt(
		&self,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
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
		}];

		Ok(events)
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::{BlockchainNetwork, BudgetId, Currency, PaymentReceiptId, UserId};
	use assert_matches::assert_matches;
	use mockall::predicate::*;
	use rstest::{fixture, rstest};
	use std::str::FromStr;
	use testing::fixtures::payment::*;
	use uuid::Uuid;

	#[fixture]
	fn payment_receipt_id() -> PaymentReceiptId {
		Uuid::from_str("00000000-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn budget_id() -> BudgetId {
		Uuid::from_str("11111111-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn requestor_id() -> UserId {
		Uuid::from_str("22222222-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn wrong_requestor_id() -> UserId {
		Uuid::from_str("22222222-bbbb-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn recipient_id() -> UserId {
		Uuid::from_str("33333333-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn wrong_recipient_id() -> UserId {
		Uuid::from_str("33333333-bbbb-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn amount_in_usd() -> u32 {
		420
	}

	#[fixture]
	fn reason() -> Value {
		serde_json::to_value("{}").unwrap()
	}

	#[fixture]
	fn payment_id() -> PaymentId {
		Uuid::from_str("44444444-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn amount(amount_in_usd: u32) -> Amount {
		Amount::new(
			Decimal::new(amount_in_usd as i64, 0),
			Currency::Crypto("USDC".to_string()),
		)
	}

	#[fixture]
	fn receipt() -> PaymentReceipt {
		PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: recipient_address(),
			transaction_hash: transaction_hash(),
		}
	}

	#[fixture]
	fn payment_created_event(
		payment_receipt_id: PaymentReceiptId,
		payment_id: PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> PaymentEvent {
		PaymentEvent::Processed {
			id: payment_id,
			receipt_id: payment_receipt_id,
			amount,
			receipt,
		}
	}

	#[fixture]
	async fn requested_payment(
		payment_id: PaymentId,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Payment {
		let mut user_exists = UserExists::default();
		user_exists.expect_is_satisfied_by().returning(|_| Ok(true));

		let events = Payment::request(
			&user_exists,
			payment_id,
			budget_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
		.await
		.expect("Problem when creating payment");
		Payment::from_events(&events)
	}

	#[rstest]
	async fn test_add_receipt(
		payment_receipt_id: PaymentReceiptId,
		payment_created_event: PaymentEvent,
		amount: Amount,
		receipt: PaymentReceipt,
		#[future] requested_payment: Payment,
	) {
		let events = requested_payment
			.await
			.add_receipt(payment_receipt_id, amount, receipt)
			.expect("Problem when adding receipt");

		assert_eq!(events, vec![payment_created_event]);
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
			Amount::new(amount.amount() + amount.amount(), amount.currency().clone()),
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
	async fn test_request(
		payment_id: PaymentId,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut user_exists_specification = UserExists::default();
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(requestor_id))
			.once()
			.returning(|_| Ok(true));
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(recipient_id))
			.once()
			.returning(|_| Ok(true));

		let events = Payment::request(
			&user_exists_specification,
			payment_id,
			budget_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason.clone(),
		)
		.await
		.unwrap();

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			PaymentEvent::Requested {
				id: payment_id,
				budget_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				reason,
			}
		);
	}

	#[rstest]
	async fn test_request_with_wrong_requestor_id(
		payment_id: PaymentId,
		budget_id: BudgetId,
		wrong_requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut user_exists_specification = UserExists::default();
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(wrong_requestor_id))
			.once()
			.returning(|_| Ok(false));

		let result = Payment::request(
			&user_exists_specification,
			payment_id,
			budget_id,
			wrong_requestor_id,
			recipient_id,
			amount_in_usd,
			reason.clone(),
		)
		.await;

		assert!(result.is_err());
		assert_matches!(result, Err(Error::RequestorNotFound));
	}

	#[rstest]
	async fn test_request_with_wrong_recipient_id(
		payment_id: PaymentId,
		budget_id: BudgetId,
		requestor_id: UserId,
		wrong_recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut user_exists_specification = UserExists::default();
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(requestor_id))
			.once()
			.returning(|_| Ok(true));
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(wrong_recipient_id))
			.once()
			.returning(|_| Ok(false));

		let result = Payment::request(
			&user_exists_specification,
			payment_id,
			budget_id,
			requestor_id,
			wrong_recipient_id,
			amount_in_usd,
			reason.clone(),
		)
		.await;

		assert!(result.is_err());
		assert_matches!(result, Err(Error::RecipientNotFound));
	}

	#[rstest]
	fn test_event_sourced(payment_id: PaymentId) {
		let event = PaymentEvent::Requested {
			id: payment_id,
			budget_id: Default::default(),
			requestor_id: Default::default(),
			recipient_id: Default::default(),
			amount_in_usd: Default::default(),
			reason: Default::default(),
		};

		let payment = Payment::from_events(&[event]);
		assert_eq!(payment.id, payment_id);
	}
}
