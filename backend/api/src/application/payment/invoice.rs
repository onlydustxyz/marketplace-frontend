use std::sync::Arc;

use anyhow::Result;
use domain::{AggregateRepository, DomainError, Event, PaymentId, Project, ProjectId, Publisher};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::{domain::Publishable, presentation::http::dto::PaymentReference};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn mark_invoice_as_received(
		&self,
		payment_references: &Vec<PaymentReference>,
	) -> Result<(), DomainError> {
		for payment_reference in payment_references {
			self.mark_invoice_as_received_for_payment_request(
				&(*payment_reference.project_id()).into(),
				&(*payment_reference.payment_id()).into(),
			)
			.await?;
		}
		Ok(())
	}

	async fn mark_invoice_as_received_for_payment_request(
		&self,
		project_id: &ProjectId,
		payment_id: &PaymentId,
	) -> Result<(), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;
		project
			.mark_invoice_as_received(payment_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;
		Ok(())
	}

	#[instrument(skip(self))]
	pub async fn reject_invoice(
		&self,
		payment_references: &Vec<PaymentReference>,
	) -> Result<(), DomainError> {
		for payment_reference in payment_references {
			self.reject_invoice_for_payment_request(
				&(*payment_reference.project_id()).into(),
				&(*payment_reference.payment_id()).into(),
			)
			.await?;
		}
		Ok(())
	}

	async fn reject_invoice_for_payment_request(
		&self,
		project_id: &ProjectId,
		payment_id: &PaymentId,
	) -> Result<(), DomainError> {
		let project = self.project_repository.find_by_id(project_id)?;
		project
			.reject_invoice(payment_id)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;
		Ok(())
	}
}
