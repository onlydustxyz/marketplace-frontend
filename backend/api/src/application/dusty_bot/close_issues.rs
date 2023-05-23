use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, GithubFetchService, Payment, PaymentWorkItem};
use futures::future::try_join_all;

use crate::domain::DustyBotAsyncService;

/// Usecase represents a set of operations related to closing Github issues for a payment.
#[derive(Constructor)]
pub struct Usecase {
    /// An Arc of GithubFetchService implementation that is used to retrieve information about the
    /// Github repository related to a payment work item.
    fetch_service: Arc<dyn GithubFetchService>,
    /// An Arc of DustyBotAsyncService implementation that is used to interact with the Github API
    /// and close an issue.
    dusty_bot_service: Arc<dyn DustyBotAsyncService>,
}

impl Usecase {
    /// Attempts to close the issue associated with a payment work item.
    ///
    /// # Arguments
    ///
    /// * `work_item` - A reference to the payment work item to close an issue for.
    ///
    /// # Returns
    ///
    /// Returns Ok(()) if the operation was successful, otherwise returns a DomainError.
    async fn close_issue(&self, work_item: &PaymentWorkItem) -> Result<(), DomainError> {
        let repository = self.fetch_service.repo_by_id(work_item.repo_id()).await?;

        self.dusty_bot_service
            .close_issue(
                repository.owner(),
                repository.name(),
                work_item.issue_number(),
            )
            .await
            .map_err(DomainError::InternalError)?;

        Ok(())
    }

    /// Attempts to close all issues associated with a payment.
    ///
    /// # Arguments
    ///
    /// * `payment` - A reference to the payment to close issues for.
    ///
    /// # Returns
    ///
    /// Returns Ok(()) if the operation was successful, otherwise returns a DomainError.
    pub async fn close_all_issues(&self, payment: &Payment) -> Result<(), DomainError> {
        let handles = payment.work_items().iter().map(|work_item| self.close_issue(work_item));

        try_join_all(handles).await?;
        Ok(())
    }
}