use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde_json::Value;
use thiserror::Error;

use crate::{
	specifications, Aggregate, PaymentRequestEvent, PaymentRequestId, ProjectId, Specifications,
	UserId,
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
		specifications: &Specifications,
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
