/// The `Budget` struct represents a budget, with an ID, an allocated amount, and a collection of payments.
use std::collections::HashMap;

use chrono::Duration;
use derive_getters::Getters;
use rust_decimal::Decimal;
use thiserror::Error;

use crate::{
	payment::Reason, Aggregate, AggregateEvent, Amount, BudgetEvent, BudgetId, Currency, Entity,
	EventSourcable, GithubUserId, Payment, PaymentError, PaymentId, PaymentReceipt,
	PaymentReceiptId, PaymentStatus, UserId,
};

/// Enum representing possible errors that can occur while working with a budget.
#[derive(Debug, Error)]
pub enum Error {
	#[error("Not enough budget left")]
	Overspent,
	#[error("Invalid currency")]
	InvalidCurrency,
	#[error("Payment not found {0}")]
	PaymentNotFound(PaymentId),
	#[error(transparent)]
	Payment(#[from] PaymentError),
}

type Result<T> = std::result::Result<T, Error>;

/// The `Budget` struct represents a budget, with an ID, an allocated amount, and a collection of payments.
#[derive(Default, Debug, Clone, PartialEq, Eq, Getters)]
pub struct Budget {
	/// ID of the budget.
	id: BudgetId,
	/// Allocated amount of the budget.
	allocated_amount: Amount,
	/// Collection of payments of the budget.
	payments: HashMap<PaymentId, Payment>,
}

impl Budget {
	/// Creates a new budget with the given ID and currency.
	pub fn create(id: BudgetId, currency: Currency) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Created { id, currency }]
	}

	/// Allocates the given budget diff and returns a Vec of BudgetEvents.
	/// Returns an error if not enough budget is left after the allocation.
	pub fn allocate(&self, diff: Decimal) -> Result<Vec<BudgetEvent>> {
		if *self.allocated_amount.amount() + diff < self.spent_amount() {
			return Err(Error::Overspent);
		}

		Ok(vec![BudgetEvent::Allocated {
			id: self.id,
			amount: diff,
		}])
	}

	/// Requests a payment with the specified parameters and returns a Vec of BudgetEvents.
	/// Returns an error if the payment is in a different currency or if there is not enough budget left.
	pub fn request_payment(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		duration_worked: Duration,
		reason: Reason,
	) -> Result<Vec<BudgetEvent>> {
		if self.allocated_amount.currency() != amount.currency() {
			return Err(Error::InvalidCurrency);
		}

		if self.spent_amount() + amount.amount() > *self.allocated_amount.amount() {
			return Err(Error::Overspent);
		}

		Ok(Payment::request(
			payment_id,
			requestor_id,
			recipient_id,
			amount,
			duration_worked,
			reason,
		)
		.into_iter()
		.map(|event| BudgetEvent::Payment { id: self.id, event })
		.collect())
	}

	/// Cancels a payment request with the specified ID and returns a Vec of BudgetEvents.
	/// Returns an error if the payment is not found.
	pub fn cancel_payment_request(&self, payment_id: &PaymentId) -> Result<Vec<BudgetEvent>> {
		let payment = self.payments.get(payment_id).ok_or(Error::PaymentNotFound(*payment_id))?;
		Ok(payment
			.cancel()?
			.into_iter()
			.map(|event| BudgetEvent::Payment { id: self.id, event })
			.collect())
	}

	/// Adds a payment receipt with the specified parameters and returns a Vec of BudgetEvents.
	/// Returns an error if the payment is not found.
	pub async fn add_payment_receipt(
		&self,
		payment_id: &PaymentId,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		let payment = self.payments.get(payment_id).ok_or(Error::PaymentNotFound(*payment_id))?;

		Ok(payment
			.add_receipt(receipt_id, amount, receipt)?
			.into_iter()
			.map(|event| BudgetEvent::Payment { id: self.id, event })
			.collect())
	}

	/// Returns the total amount spent (excluding cancelled payments) in the budget.
	pub fn spent_amount(&self) -> Decimal {
		self.payments
			.values()
			.filter(|payment| *payment.status() != PaymentStatus::Cancelled)
			.fold(Decimal::ZERO, |amount, payment| {
				amount + payment.requested_usd_amount()
			})
	}

	/// Marks an invoice as received for the payment with the specified ID and returns a Vec of BudgetEvents.
	/// Returns an error if the payment is not found.
	pub fn mark_invoice_as_received(&self, payment_id: &PaymentId) -> Result<Vec<BudgetEvent>> {
		let payment = self.payments.get(payment_id).ok_or(Error::PaymentNotFound(*payment_id))?;
		Ok(payment
			.mark_invoice_as_received()?
			.into_iter()
			.map(|event| BudgetEvent::Payment { id: self.id, event })
			.collect())
	}

	/// Rejects