use std::sync::Arc;

use anyhow::Result;
use domain::{
    AggregateRootRepository, Budget, DomainError, Event, EventSourcable, Payment, PaymentId,
    Project, ProjectId, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

use crate::domain::Publishable;

/// A struct representing a use case for cancelling a payment request for a project.
pub struct Usecase {
    /// An Arc reference to the event publisher used to publish domain events.
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    /// An AggregateRootRepository for retrieving and updating project aggregates.
    project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
    /// Constructs a new Usecase instance with the given dependencies.
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - An Arc reference to the event publisher used to publish domain events.
    /// * `project_repository` - An AggregateRootRepository for retrieving and updating project aggregates.
    ///
    /// # Returns
    ///
    /// A new Usecase instance.
    pub fn new(
        event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
        project_repository: AggregateRootRepository<Project>,
    ) -> Self {
        Self {
            event_publisher,
            project_repository,
        }
    }

    /// Cancels a payment request for the specified project and payment IDs, and publishes resulting events.
    ///
    /// # Arguments
    ///
    /// * `project_id` - A reference to the ID of the project to cancel the payment request for.
    /// * `payment_id` - A reference to the ID of the payment to cancel.
    ///
    /// # Returns
    ///
    /// A tuple containing the updated Project, Budget, and Payment instances, or a DomainError if the cancellation request is invalid.
    #[instrument(skip(self))]
    pub async fn cancel(
        &self,
        project_id: &ProjectId,
        payment_id: &PaymentId,
    ) -> Result<(Project, Budget, Payment), DomainError> {
        let project = self.project_repository.find_by_id(project_id)?;

        let events = project
            .cancel_payment_request(payment_id)
            .await
            .map_err(|e| DomainError::InvalidInputs(e.into()))?;

        let project = project.apply_events(&events);
        let budget = project.budget().clone().unwrap();
        let payment = budget.payments().get(payment_id).cloned().unwrap();

        events
            .into_iter()
            .map(Event::from)
            .map(UniqueMessage::new)
            .collect::<Vec<_>>()
            .publish(self.event_publisher.clone())
            .await?;

        Ok((project, budget, payment))
    }
}