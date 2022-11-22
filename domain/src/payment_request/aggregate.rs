use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde_json::Value;
use std::sync::Arc;
use thiserror::Error;

use crate::{
	specifications, specifications::Specifications, Aggregate, PaymentRequestEvent,
	PaymentRequestId, ProjectId, UserId,
};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project not found")]
	ProjectNotFound,
	#[error(transparent)]
	Specification(specifications::Error),
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct PaymentRequest {
	id: PaymentRequestId,
}

impl Aggregate for PaymentRequest {
	type Event = PaymentRequestEvent;
	type Id = PaymentRequestId;
}

impl PaymentRequest {
	pub async fn create(
		specifications: Arc<dyn Specifications>,
		id: PaymentRequestId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if !specifications.project_exists(&project_id).await.map_err(Error::Specification)? {
			return Err(Error::ProjectNotFound);
		}

		Ok(vec![PaymentRequestEvent::Created {
			id,
			project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		}])
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::{specifications::tests::MockSpecifications, PaymentRequestId, ProjectId, UserId};
	use mockall::predicate::*;
	use rstest::{fixture, rstest};
	use std::{str::FromStr, sync::Arc};
	use uuid::Uuid;
	use assert_matches::assert_matches;

	#[fixture]
	fn payment_request_id() -> PaymentRequestId {
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
	fn recipient_id() -> UserId {
		Uuid::from_str("33333333-aaaa-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn amount_in_usd() -> u32 {
		420
	}

	#[fixture]
	fn reason() -> Value {
		serde_json::to_value("{}").unwrap()
	}

	#[rstest]
	async fn test_create(
		payment_request_id: PaymentRequestId,
		project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut specifications = MockSpecifications::new();
		specifications
			.expect_project_exists()
			.with(eq(project_id))
			.times(1)
			.returning(|_| Ok(true));

		let events = PaymentRequest::create(
			Arc::new(specifications),
			payment_request_id,
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
			PaymentRequestEvent::Created {
				id: payment_request_id,
				project_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				reason,
			}
		);
	}

	#[rstest]
	async fn test_create_with_wrong_project_id(
		payment_request_id: PaymentRequestId,
		wrong_project_id: ProjectId,
		requestor_id: UserId,
		recipient_id: UserId,
		amount_in_usd: u32,
		reason: Value,
	) {
		let mut specifications = MockSpecifications::new();
		specifications
			.expect_project_exists()
			.with(eq(wrong_project_id))
			.times(1)
			.returning(|_| Ok(false));

		let result = PaymentRequest::create(
			Arc::new(specifications),
			payment_request_id,
			wrong_project_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		)
		.await;

		assert!(result.is_err());
		assert_matches!(
			result,
			Err(Error::ProjectNotFound)
		);
	}
}
