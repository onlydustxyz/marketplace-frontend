use std::collections::HashMap;

use derive_getters::Getters;
use rust_decimal::Decimal;
use serde_json::Value;
use thiserror::Error;

use crate::{
	Aggregate, AggregateEvent, Amount, BudgetEvent, BudgetId, Currency, Entity, EventSourcable,
	GithubUserId, Payment, PaymentError, PaymentId, PaymentReceipt, PaymentReceiptId,
	PaymentStatus, UserId,
};

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

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters)]
pub struct Budget {
	id: BudgetId,
	allocated_amount: Amount,
	payments: HashMap<PaymentId, Payment>,
}

impl Budget {
	pub fn create(id: BudgetId, currency: Currency) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Created { id, currency }]
	}

	pub fn allocate(&self, diff: Decimal) -> Result<Vec<BudgetEvent>> {
		if *self.allocated_amount.amount() + diff < self.spent_amount() {
			return Err(Error::Overspent);
		}

		Ok(vec![BudgetEvent::Allocated {
			id: self.id,
			amount: diff,
		}])
	}

	pub fn request_payment(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		reason: Value,
	) -> Result<Vec<BudgetEvent>> {
		if self.allocated_amount.currency() != amount.currency() {
			return Err(Error::InvalidCurrency);
		}

		if self.spent_amount() + amount.amount() > *self.allocated_amount.amount() {
			return Err(Error::Overspent);
		}

		Ok(
			Payment::request(payment_id, requestor_id, recipient_id, amount, reason)
				.into_iter()
				.map(|event| BudgetEvent::Payment { id: self.id, event })
				.collect(),
		)
	}

	pub fn cancel_payment_request(&self, payment_id: &PaymentId) -> Result<Vec<BudgetEvent>> {
		let payment = self.payments.get(payment_id).ok_or(Error::PaymentNotFound(*payment_id))?;
		Ok(payment
			.cancel()?
			.into_iter()
			.map(|event| BudgetEvent::Payment { id: self.id, event })
			.collect())
	}

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

	fn spent_amount(&self) -> Decimal {
		self.payments
			.values()
			.filter(|payment| *payment.status() != PaymentStatus::Cancelled)
			.fold(Decimal::ZERO, |amount, payment| {
				amount + payment.requested_usd_amount()
			})
	}
}

impl Entity for Budget {
	type Id = BudgetId;
}

impl Aggregate for Budget {
	type Event = BudgetEvent;
}

impl EventSourcable for Budget {
	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			BudgetEvent::Created { id, currency } => Self {
				id: *id,
				allocated_amount: Amount::new(Decimal::ZERO, currency.clone()),
				..self
			},
			BudgetEvent::Allocated { id, amount, .. } => Self {
				id: *id,
				allocated_amount: self.allocated_amount + amount,
				..self
			},
			BudgetEvent::Payment { event, .. } => {
				let payment_id = event.aggregate_id();

				self.payments
					.entry(*payment_id)
					.and_modify(|payment| *payment = payment.clone().apply_event(event))
					.or_insert_with(|| Payment::default().apply_event(event));
				self
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use assert_matches::assert_matches;
	use rstest::*;
	use rust_decimal_macros::dec;
	use uuid::Uuid;

	use super::*;
	use crate::*;

	#[fixture]
	#[once]
	fn budget_id() -> BudgetId {
		Uuid::new_v4().into()
	}

	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		Uuid::new_v4().into()
	}

	#[fixture]
	#[once]
	fn payment_id() -> PaymentId {
		Uuid::new_v4().into()
	}

	#[fixture]
	fn amount() -> Decimal {
		dec!(500)
	}

	#[fixture]
	fn currency() -> Currency {
		Currency::Crypto("USDC".to_string())
	}

	#[fixture]
	fn budget_created_event(budget_id: &BudgetId, currency: Currency) -> BudgetEvent {
		BudgetEvent::Created {
			id: *budget_id,
			currency,
		}
	}

	#[fixture]
	fn budget_allocated_event(budget_id: &BudgetId, amount: Decimal) -> BudgetEvent {
		BudgetEvent::Allocated {
			id: *budget_id,
			amount,
		}
	}

	#[rstest]
	fn create_budget(budget_id: &BudgetId, currency: Currency, budget_created_event: BudgetEvent) {
		assert_eq!(
			Budget::create(*budget_id, currency),
			vec![budget_created_event]
		);
	}

	#[rstest]
	fn allocate_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event]);
		let result = budget.allocate(amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(result.unwrap(), vec![budget_allocated_event]);
	}

	#[rstest]
	fn spend_budget(
		amount: Decimal,
		currency: Currency,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			Amount::new(amount, currency),
			Default::default(),
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let events = result.unwrap();
		assert_matches!(
			events[0],
			BudgetEvent::Payment {
				id: _,
				event: PaymentEvent::Requested { .. }
			}
		);
	}

	#[rstest]
	fn spend_and_cancel_budget(
		amount: Decimal,
		currency: Currency,
		payment_id: &PaymentId,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.request_payment(
			*payment_id,
			Default::default(),
			Default::default(),
			Amount::new(amount, currency.clone()),
			Default::default(),
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());

		let budget = budget.apply_events(&result.unwrap());
		let result = budget.cancel_payment_request(payment_id);
		assert!(result.is_ok(), "{}", result.err().unwrap());

		let budget = budget.apply_events(&result.unwrap());
		let result = budget.request_payment(
			*payment_id,
			Default::default(),
			Default::default(),
			Amount::new(amount, currency),
			Default::default(),
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	fn overspend_budget(
		amount: Decimal,
		currency: Currency,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			Amount::new(amount * dec!(2), currency),
			Default::default(),
		);
		assert_matches!(result, Err(Error::Overspent));
	}

	#[rstest]
	fn spend_in_different_currency(
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			Amount::new(dec!(10), crate::Currency::Crypto("USDT".to_string())),
			Default::default(),
		);

		assert_matches!(result, Err(Error::InvalidCurrency));
	}

	#[rstest]
	fn refill_budget(
		amount: Decimal,
		currency: Currency,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);

		let events = budget
			.request_payment(
				PaymentId::new(),
				Default::default(),
				Default::default(),
				Amount::new(amount, currency.clone()),
				Default::default(),
			)
			.unwrap();
		let budget = budget.apply_events(&events);

		// refill
		let result = budget.allocate(amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let budget = budget.apply_events(&result.unwrap());

		// start spending again !
		let events = budget
			.request_payment(
				PaymentId::new(),
				Default::default(),
				Default::default(),
				Amount::new(amount, currency),
				Default::default(),
			)
			.unwrap();
		let budget = budget.apply_events(&events);

		// no more budget !
		assert_eq!(&budget.spent_amount(), budget.allocated_amount.amount());
	}

	#[rstest]
	fn cut_budget(
		amount: Decimal,
		currency: Currency,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[
			budget_created_event,
			budget_allocated_event.clone(),
			budget_allocated_event,
		]);

		let events = budget
			.request_payment(
				PaymentId::new(),
				Default::default(),
				Default::default(),
				Amount::new(amount, currency),
				Default::default(),
			)
			.unwrap();
		let budget = budget.apply_events(&events);

		// cut budget
		let result = budget.allocate(-amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let budget = budget.apply_events(&result.unwrap());

		// no more budget !
		assert_eq!(&budget.spent_amount(), budget.allocated_amount.amount());
	}

	#[rstest]
	fn cannot_cut_budget_below_spent(
		amount: Decimal,
		currency: Currency,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);

		let events = budget
			.request_payment(
				PaymentId::new(),
				Default::default(),
				Default::default(),
				Amount::new(amount, currency),
				Default::default(),
			)
			.unwrap();
		let budget = budget.apply_events(&events);

		// cut budget fails
		let result = budget.allocate(-amount);
		assert_matches!(result, Err(Error::Overspent));
	}
}
