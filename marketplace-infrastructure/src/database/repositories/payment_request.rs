use anyhow::anyhow;
use diesel::{QueryDsl, RunQueryDsl};
use log::error;
use marketplace_domain::{
	PaymentRequest, PaymentRequestId, PaymentRequestRepository, PaymentRequestRepositoryError,
};

use crate::database::{models, schema::payment_requests::dsl, Client, DatabaseError};

impl PaymentRequestRepository for Client {
	fn insert(&self, payment_request: PaymentRequest) -> Result<(), PaymentRequestRepositoryError> {
		let connection = self.connection().map_err(PaymentRequestRepositoryError::from)?;

		let payment_request: models::PaymentRequest = payment_request.into();

		diesel::insert_into(dsl::payment_requests)
			.values(&payment_request)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert payment request {payment_request:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn find(&self, id: PaymentRequestId) -> Result<PaymentRequest, PaymentRequestRepositoryError> {
		let connection = self.connection().map_err(PaymentRequestRepositoryError::from)?;

		let payment_request = dsl::payment_requests
			.find(id.as_ref())
			.first::<models::PaymentRequest>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(payment_request.into())
	}
}

impl From<DatabaseError> for PaymentRequestRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(anyhow!(error)),
				_ => Self::Infrastructure(anyhow!(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(anyhow!(error)),
		}
	}
}

impl From<models::PaymentRequest> for PaymentRequest {
	fn from(payment_request: models::PaymentRequest) -> Self {
		PaymentRequest::new(
			payment_request.id.into(),
			payment_request.project_id.into(),
			payment_request.requestor_id.into(),
			payment_request.recipient_id.into(),
			payment_request.amount_in_usd as u32,
			payment_request.reason,
		)
	}
}

impl From<PaymentRequest> for models::PaymentRequest {
	fn from(payment_request: PaymentRequest) -> Self {
		let (id, project_id, requestor_id, recipient_id, amount_in_usd, reason) =
			payment_request.dissolve();
		Self {
			id: id.into(),
			project_id: project_id.into(),
			requestor_id: requestor_id.into(),
			recipient_id: recipient_id.into(),
			amount_in_usd: amount_in_usd as i64,
			reason,
		}
	}
}
