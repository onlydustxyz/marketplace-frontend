use std::sync::Arc;

use domain::{
    AggregateRootRepository, Destination, DomainError, Event, Project, ProjectId, Publisher, UserId,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

/// This struct defines a usecase that provides the ability to remove a leader from a project.
pub struct Usecase {
    /// An Arc reference to a Publisher that can send UniqueMessage<Event>.
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    /// An AggregateRootRepository that holds the Project.
    project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
    /// Create a new instance of this Usecase.
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - An Arc reference to a Publisher that can send UniqueMessage<Event>.
    /// * `project_repository` - An AggregateRootRepository that holds the Project.
    ///
    /// # Returns
    ///
    /// A new instance of the Usecase.
    pub fn new(
        event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
        project_repository: AggregateRootRepository<Project>,
    ) -> Self {
        Self {
            event_publisher,
            project_repository,
        }
    }

    /// This function removes a leader from the project with the given ProjectId.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ProjectId of the project from which to remove the leader.
    /// * `user_id` - The UserId of the leader to remove.
    ///
    /// # Returns
    ///
    /// An empty Ok result if the operation succeeded, or a DomainError if there was a problem with the inputs.
    #[instrument(skip(self))]
    pub async fn remove_leader(
        &self,
        project_id: &ProjectId,
        user_id: &UserId,
    ) -> Result<(), DomainError> {
        let project = self.project_repository.find_by_id(project_id)?;

        let events = project
            .unassign_leader(*user_id)
            .map_err(|e| DomainError::InvalidInputs(e.into()))?
            .into_iter()
            .map(Event::from)
            .map(UniqueMessage::new)
            .collect::<Vec<_>>();

        self.event_publisher
            .publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
            .await?;

        Ok(())
    }
}