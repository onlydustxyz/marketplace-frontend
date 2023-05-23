/**
 * This module supplies various permission types
 */

use std::collections::HashSet;

use domain::{
    AggregateRootRepository, GithubUserId, PaymentId, Project, ProjectId, UserId,
};

mod admin;
mod anonymous;
mod identified;

pub trait Permissions: Send + Sync {
    /**
     * Checks if the user has permission to spend budget of a project
     * @param project_id A reference to the id of the project being checked for permission
     * @return A boolean indicating if the user has the permission or not
     */
    fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool;

    /**
     * Checks if the user has permission to create a Github issue for a project
     * @param project_id A reference to the id of the project being checked for permission
     * @return A boolean indicating if the user has the permission or not
     */
    fn can_create_github_issue_for_project(&self, project_id: &ProjectId) -> bool;

    /**
     * Checks if the user has permission to ignore an issue for a project
     * @param project_id A reference to the id of the project being checked for permission
     * @return A boolean indicating if the user has the permission or not
     */
    fn can_ignore_issue_for_project(&self, project_id: &ProjectId) -> bool;

    /**
     * Checks if the user has permission to unassign a project leader
     * @param project_id A reference to the id of the project being checked for permission
     * @param user_id A reference to the id of the user being checked for permission
     * @return A boolean indicating if the user has the permission or not
     */
    fn can_unassign_project_leader(
        &self,
        project_id: &ProjectId,
        user_id: &UserId,
    ) -> bool;

    /**
     * Checks if the user has permission to mark invoice as received for a payment
     * @param project_id A reference to the id of the project being checked for permission
     * @param payment_id A reference to the id of the payment being checked for permission
     * @return A boolean indicating if the user has the permission or not
     */
    fn can_mark_invoice_as_received_for_payment(
        &self,
        project_id: &ProjectId,
        payment_id: &PaymentId,
    ) -> bool;
}

pub trait IntoPermission {
    /**
     * Converts into permission
     * @param project_repository An AggregateRootRepository for projects
     * @return A Boxed trait object of Permissions
     */
    fn to_permissions(
        &self,
        project_repository: AggregateRootRepository<Project>,
    ) -> Box<dyn Permissions>;
}

/**
 * Gets an admin permission
 * @return A Boxed trait object of Permissions
 */
pub fn of_admin() -> Box<dyn Permissions> {
    Box::new(admin::Admin)
}

/**
 * Gets an identified user permission
 * @param projects A HashSet of ProjectIds representing the identified user's projects
 * @param github_user_id The GitHub user id of the identified user
 * @param project_repository An AggregateRootRepository for projects
 * @return A Boxed trait object of Permissions
 */
pub fn of_identified_user(
    projects: HashSet<ProjectId>,
    github_user_id: GithubUserId,
    project_repository: AggregateRootRepository<Project>,
) -> Box<dyn Permissions> {
    Box::new(identified::IdentifiedUser::new(
        projects,
        github_user_id,
        project_repository,
    ))
}

/**
 * Gets an anonymous permission
 * @return A Boxed trait object of Permissions
 */
pub fn of_anonymous() -> Box<dyn Permissions> {
    Box::new(anonymous::Anonymous)
}