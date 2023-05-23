/// This module contains a function to create a project refresher
use std::sync::Arc;

use domain::Project;
use event_listeners::{
    domain::{BudgetProjector, ProjectProjector},
    infrastructure::database::{
        BudgetRepository, PaymentRepository, PaymentRequestRepository,
        ProjectGithubReposRepository, ProjectLeadRepository, ProjectRepository, WorkItemRepository,
    },
};
use infrastructure::database;

use super::{Refreshable, Refresher};

/// Creates a refresher for project with project and budget projectors
///
/// # Arguments
///
/// * `database` - A cloned instance of the main database client
///
/// # Return
///
/// Returns an implementation of the `Refreshable` trait which updates the projects
/// project and budget projection instances when a relevant event is fired.
///
/// # Panics
///
/// The function panics if creating any of the required repositories fails.
pub fn create(database: Arc<database::Client>) -> impl Refreshable {
    let project_projector = ProjectProjector::new(
        ProjectRepository::new(database.clone()),
        ProjectLeadRepository::new(database.clone()),
        ProjectGithubReposRepository::new(database.clone()),
        database.clone(),
    );

    let budget_projector = BudgetProjector::new(
        PaymentRequestRepository::new(database.clone()),
        PaymentRepository::new(database.clone()),
        BudgetRepository::new(database.clone()),
        WorkItemRepository::new(database.clone()),
        database.clone(),
        database.clone(),
    );

    Refresher::<Project>::new(
        database,
        vec![Arc::new(project_projector), Arc::new(budget_projector)],
    )
}