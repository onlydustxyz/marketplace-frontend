//! This module contains the `Usecase` struct and its implementations.
//! The `Usecase` struct is used to update the allocation of a project's budget.
//!
//! # Example
//!
//! ```
//! use std::sync::Arc;
//! use anyhow::anyhow;
//! use domain::{
//!     AggregateRootRepository, Amount, BudgetId, DomainError, Event, EventSourcable, Project,
//!     ProjectId, Publisher,
//! };
//! use infrastructure::amqp::UniqueMessage;
//! use rust_decimal::Decimal;
//! use tracing::instrument;
//! use crate::domain::Publishable;
//!
//! pub struct Usecase {
//!     event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
//!     project_repository: AggregateRootRepository<Project>,
//! }
//!
//! impl Usecase {
//!     /// Constructs a new instance of `Usecase`.
//!     ///
//!     /// # Arguments
//!     ///
//!     /// * `event_publisher` - The event publisher.
//!     /// * `project_repository` - The project repository.
//!     ///
//!     /// # Returns
//!     ///
//!     /// A new instance of `Usecase`.
//!     pub fn new(
//!         event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
//!         project_repository: AggregateRootRepository<Project>,
//!     ) -> Self {
//!         Self {
//!             event_publisher,
//!             project_repository,
//!         }
//!     }
//!
//!     /// Updates the allocation of the given project's budget.
//!     ///
//!     /// # Arguments
//!     ///
//!     /// * `project_id` - The project identifier.
//!     /// * `new_remaining_amount` - The new remaining amount of the project's budget.
//!     ///
//!     /// # Returns
//!     ///
//!     /// The `BudgetId` of the updated budget.
//!     ///
//!     /// # Errors
//!     ///
//!     /// Returns a `DomainError` if the project is not found or if an error occurs during the
//!     /// allocation of the project's budget.
//!     #[instrument(skip(self))]
//!     pub async fn update_allocation(
//!         &self,
//!         project_id: &ProjectId,
//!         new_remaining_amount: &Amount,
//!     ) -> Result<BudgetId, DomainError> {
//!         let project = self.project_repository.find_by_id(project_id)?;
//!
//!         let current_remaining_amount = project.budget().as_ref().map_or(Decimal::ZERO, |b| {
//!             b.allocated_amount().amount() - b.spent_amount()
//!         });
//!
//!         let diff_amount = new_remaining_amount - current_remaining_amount;
//!
//!         let events = project
//!             .allocate_budget(&diff_amount)
//!             .map_err(|error| DomainError::InvalidInputs(error.into()))?;
//!
//!         let project = project.apply_events(&events);
//!
//!         let budget = project.budget().as_ref().ok_or(DomainError::InternalError(anyhow!(
//!             "Failed while allocating budget"
//!         )))?;
//!
//!         events
//!             .into_iter()
//!             .map(Event::from)
//!             .map(UniqueMessage::new)
//!             .collect::<Vec<_>>()
//!             .publish(self.event_publisher.clone())
//!             .await?;
//!
//!         Ok(*budget.id())
//!     }
//! }
//! ```