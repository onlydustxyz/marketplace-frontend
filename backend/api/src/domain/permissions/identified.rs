/// This module defines IdentifiedUser and its implementation
///
/// IdentifiedUser has the following methods:
/// * can_spend_budget_of_project
/// * can_create_github_issue_for_project
/// * can_ignore_issue_for_project
/// * can_unassign_project_leader
/// * can_mark_invoice_as_received_for_payment
///
/// IdentifiedUser implements the Permissions trait
///
/// Permissions can be granted if the user is assigned to the project
///
/// is_recipient_of_payment_request determines if a given user is the intended recipient of a
/// payment request for a given project and payment id. This is done by fetching the project by
/// project_id and checking if the payment with payment_id belongs to the project and its status is
/// "Active" and the recipient_id matches github_user_id
use std::collections::HashSet;

use anyhow::{anyhow, Result};
use derive_more::Constructor;
use domain::{AggregateRootRepository, GithubUserId, PaymentId, PaymentStatus, Project, ProjectId};

use super::Permissions;

#[derive(Constructor)]
pub(super) struct IdentifiedUser {
    projects: HashSet<ProjectId>,
    github_user_id: GithubUserId,
    project_repository: AggregateRootRepository<Project>,
}

impl Permissions for IdentifiedUser {
    /// Determines whether the identified user can spend the budget of the project with the
    /// supplied project_id
    fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool {
        self.projects.contains(project_id)
    }

    /// Determines whether the identified user can create a GitHub issue for the project with the
    /// supplied project_id
    fn can_create_github_issue_for_project(&self, project_id: &ProjectId) -> bool {
        self.projects.contains(project_id)
    }

    /// Determines whether the identified user can ignore issues for the project with the supplied
    /// project_id
    fn can_ignore_issue_for_project(&self, project_id: &ProjectId) -> bool {
        self.projects.contains(project_id)
    }

    /// Determines whether the identified user can un-assign a project leader from the project with
    /// the supplied project_id. This method always returns false
    fn can_unassign_project_leader(
        &self,
        _project_id: &ProjectId,
        _user_id: &domain::UserId,
    ) -> bool {
        false
    }

    /// Determines whether the identified user can mark an invoice as received for the payment with
    /// the supplied payment_id, for the project with the supplied project_id
    fn can_mark_invoice_as_received_for_payment(
        &self,
        project_id: &ProjectId,
        payment_id: &PaymentId,
    ) -> bool {
        self.is_recipient_of_payment_request(project_id, payment_id).unwrap_or(false)
    }
}

impl IdentifiedUser {
    /// Determines whether the identified user is the intended recipient of a payment request for
    /// the payment with the supplied payment_id, for the project with the supplied project_id
    fn is_recipient_of_payment_request(
        &self,
        project_id: &ProjectId,
        payment_id: &PaymentId,
    ) -> Result<bool> {
        let project = self.project_repository.find_by_id(project_id)?;
        let budget = project
            .budget()
            .clone()
            .ok_or_else(|| anyhow!("Project {project_id} has no budget"))?;
        let payment = budget.payments().get(payment_id).ok_or_else(|| {
            anyhow!("No payment with ID {payment_id} belongs to project {project_id}")
        })?;

        Ok(*payment.status() == PaymentStatus::Active
            && *payment.recipient_id() == self.github_user_id)
    }
}