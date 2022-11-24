use super::amount::Amount;
#[cfg_attr(test, mockall_double::double)]
use crate::specifications::{ProjectExists, UserExists};
use crate::{
	specifications, Aggregate, AggregateRoot, EventSourcable, PaymentEvent, PaymentId,
	PaymentReceipt, PaymentReceiptId, ProjectId, UserId,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use thiserror::Error;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

impl EventSourcable for Payment {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			PaymentEvent::Requested { id, .. } => Self { id: *id },
			PaymentEvent::Processed { id, .. } => Self { id: *id },
		}
	}
}

impl AggregateRoot for Payment {}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project not found")]
	ProjectNotFound,
	#[error("Requestor not found")]
	RequestorNotFound,
	#[error("Recipient not found")]
	RecipientNotFound,
	#[error(transparent)]
	Specification(specifications::Error),
}

impl Payment {
	#[cfg_attr(feature = "cargo-clippy", allow(clippy::too_many_arguments))]
	pub async fn request(
		project_exists_specification: &ProjectExists,
		user_exists_specification: &UserExists,
		id: PaymentId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if !project_exists_specification
			.is_satisfied_by(&project_id)
			.map_err(Error::Specification)?
		{
			return Err(Error::ProjectNotFound);
		}

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
			project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		}])
	}

	pub fn add_receipt(
		id: PaymentId,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		let events = vec![PaymentEvent::Processed {
			id,
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
	#[mockall_double::double]
	use crate::specifications::ProjectExists;
	use crate::{BlockchainNetwork, Currency, PaymentReceiptId, ProjectId, UserId};
	use assert_matches::assert_matches;
	use mockall::predicate::*;
	use rstest::{fixture, rstest};
	use rust_decimal_macros::dec;
	use std::str::FromStr;
	use testing::fixtures::payment::*;
	use uuid::Uuid;

	#[fixture]
	fn payment_receipt_id() -> PaymentReceiptId {
		Uuid::from_str("00000000-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("11111111-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn wrong_project_id() -> ProjectId {
		Uuid::from_str("11111111-bbbb-495e-9f4c-038ec0ebecb1").unwrap().into()
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
	fn amount() -> Amount {
		Amount::new(dec!(123.45), Currency::Crypto("USDC".to_string()))
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

	#[rstest]
	fn test_create(
		payment_receipt_id: PaymentReceiptId,
		payment_id: PaymentId,
		payment_created_event: PaymentEvent,
		amount: Amount,
		receipt: PaymentReceipt,
	) {
		let events = Payment::add_receipt(payment_id, payment_receipt_id, amount, receipt)
			.expect("Problem when creating payment");

		assert_eq!(events, vec![payment_created_event]);
	}

	#[rstest]
	async fn test_request(
		payment_id: PaymentId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut project_exists_specification = ProjectExists::default();
		project_exists_specification
			.expect_is_satisfied_by()
			.with(eq(project_id))
			.once()
			.returning(|_| Ok(true));

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
			&project_exists_specification,
			&user_exists_specification,
			payment_id,
			project_id,
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
				project_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				reason,
			}
		);
	}

	#[rstest]
	async fn test_request_with_wrong_project_id(
		payment_id: PaymentId,
		wrong_project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut project_exists_specification = ProjectExists::default();
		project_exists_specification
			.expect_is_satisfied_by()
			.with(eq(wrong_project_id))
			.once()
			.returning(|_| Ok(false));

		let user_exists_specification = UserExists::default();

		let result = Payment::request(
			&project_exists_specification,
			&user_exists_specification,
			payment_id,
			wrong_project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
		.await;

		assert!(result.is_err());
		assert_matches!(result, Err(Error::ProjectNotFound));
	}

	#[rstest]
	async fn test_request_with_wrong_requestor_id(
		payment_id: PaymentId,
		project_id: ProjectId,
		wrong_requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut project_exists_specification = ProjectExists::default();
		project_exists_specification
			.expect_is_satisfied_by()
			.with(eq(project_id))
			.once()
			.returning(|_| Ok(true));

		let mut user_exists_specification = UserExists::default();
		user_exists_specification
			.expect_is_satisfied_by()
			.with(eq(wrong_requestor_id))
			.once()
			.returning(|_| Ok(false));

		let result = Payment::request(
			&project_exists_specification,
			&user_exists_specification,
			payment_id,
			project_id,
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
		project_id: ProjectId,
		requestor_id: UserId,
		wrong_recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut project_exists_specification = ProjectExists::default();
		project_exists_specification
			.expect_is_satisfied_by()
			.with(eq(project_id))
			.once()
			.returning(|_| Ok(true));

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
			&project_exists_specification,
			&user_exists_specification,
			payment_id,
			project_id,
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
			project_id: Default::default(),
			requestor_id: Default::default(),
			recipient_id: Default::default(),
			amount_in_usd: Default::default(),
			reason: Default::default(),
		};

		let payment = Payment::from_events(&[event]);
		assert_eq!(payment.id, payment_id);
	}
}
