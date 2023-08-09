use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, GithubFetchService, Payment, PaymentWorkItem};
use futures::future::try_join_all;

use crate::domain::DustyBotService;

#[derive(Constructor)]
pub struct Usecase {
	fetch_service: Arc<dyn GithubFetchService>,
	dusty_bot_service: Arc<dyn DustyBotService>,
}

impl Usecase {
	async fn close_issue(&self, work_item: &PaymentWorkItem) -> Result<(), DomainError> {
		let repository = self.fetch_service.repo_by_id(work_item.repo_id).await?;

		self.dusty_bot_service
			.close_issue_for_number(repository.owner, repository.name, work_item.issue_number)
			.await
			.map_err(DomainError::InternalError)?;

		Ok(())
	}

	pub async fn close_all_issues(&self, payment: &Payment) -> Result<(), DomainError> {
		let handles = payment.work_items().iter().map(|work_item| self.close_issue(work_item));

		try_join_all(handles).await?;
		Ok(())
	}
}
