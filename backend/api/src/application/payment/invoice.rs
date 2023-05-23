/// This module contains the `Usecase` struct with methods to mark an invoice
/// as received or reject an invoice and publish an event.
use std::sync::Arc;

use anyhow::Result;
use domain::{
    AggregateRootRepository, DomainError, Event, PaymentId, Project, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::{domain::Publishable, presentation::http::dto::PaymentReference};

/// `Usecase` struct with methods to mark an invoice
/// as received or reject an invoice and publish an event.
pub struct Usecase {
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
    /// Creates a new instance of `Usecase`.
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - The event publisher.
    /// * `project_repository` - The project repository.
    ///
    /// # Returns
    ///
    /// A new instance of `Usecase`.
    pub fn new(
        event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
        project_repository: AggregateRootRepository<Project>,
    ) -> Self {
        Self {
            event_publisher,
            project_repository,
        }
    }

    /// Marks an invoice as received for each payment request specified in the input.
    ///
    /// # Arguments
    ///
    /// * `payment_references` - The list of payment references.
    ///
    /// # Returns
    ///
    /// Ok(()) if successful, or a `DomainError` otherwise.
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

    /// Rejects an invoice for each payment request specified in the input.
    ///
    /// # Arguments
    ///
    /// * `payment_references` - The list of payment references.
    ///
    /// # Returns
    ///
    /// Ok(()) if successful, or a `DomainError` otherwise.
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