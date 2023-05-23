/// This module defines the Usecase struct and implements methods to add payment receipts.
use std::sync::Arc;
use anyhow::{anyhow, Result};
use derive_more::Constructor;

use domain::{
    AggregateRootRepository, Amount, Destination, DomainError, Event, PaymentId, PaymentReceipt,
    PaymentReceiptId, Project, ProjectId, Publisher,
};

use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;

use infrastructure::amqp::UniqueMessage;

use tracing::instrument;

use crate::application::dusty_bot;

/// The Usecase struct holds the dependencies used for payment receipt addition.
#[derive(Constructor)]
pub struct Usecase {
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    project_repository: AggregateRootRepository<Project>,
    close_issues_usecase: dusty_bot::close_issues::Usecase,
}

impl Usecase {
    /// Adds a payment receipt to a project and returns the payment receipt id.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The identifier of the project to which payment receipt is added.
    /// * `payment_id` - The identifier of the payment for which the receipt is added.
    /// * `amount` - The amount of the payment receipt.
    /// * `receipt` - The PaymentReceipt instance for the payment.
    ///
    /// # Errors
    ///
    /// This method returns an error if either of the following occurs:
    ///
    /// * There is a failure while allocating budget.
    /// * There is a failure while finding payment.
    /// * The provided inputs are invalid.
    ///
    /// # Returns
    ///
    /// A Result containing the created PaymentReceiptId or an error indicating what went wrong.
    #[instrument(skip(self))]
    pub async fn add_payment_receipt(
        &self,
        project_id: &ProjectId,
        payment_id: &PaymentId,
        amount: Amount,
        receipt: PaymentReceipt,
    ) -> Result<PaymentReceiptId, DomainError> {
        let new_receipt_id = PaymentReceiptId::new();
        let project = self.project_repository.find_by_id(project_id)?;

        let payment = project
            .budget()
            .as_ref()
            .ok_or(DomainError::InternalError(anyhow!(
                "Failed while allocating budget"
            )))?
            .payments()
            .get(payment_id)
            .ok_or(DomainError::InternalError(anyhow!(
                "Failed while finding payment"
            )))?;

        let events: Vec<_> = project
            .add_payment_receipt(payment_id, new_receipt_id, amount, receipt)
            .await
            .map_err(|e| DomainError::InvalidInputs(e.into()))?
            .into_iter()
            .map(Event::from)
            .map(UniqueMessage::new)
            .collect();

        self.event_publisher
            .publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
            .await?;

        if let Err(error) = self.close_issues_usecase.close_all_issues(payment).await {
            olog::error!(
                error = format!("{error:?}"),
                "Unable to comment / close issue"
            )
        }

        Ok(new_receipt_id)
    }
}