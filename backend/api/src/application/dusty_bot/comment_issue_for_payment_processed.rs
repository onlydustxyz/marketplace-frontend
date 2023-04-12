use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, GithubFetchRepoService, Payment};
use futures::future::try_join_all;

use crate::domain::GithubService;

#[derive(Constructor)]
pub struct Usecase {
	github_service: Arc<dyn GithubService>,
	fetch_repo_service: Arc<dyn GithubFetchRepoService>,
}

impl Usecase {
	pub async fn comment_issue_for_payment_processed(
		&self,
		payment: &Payment,
	) -> Result<(), DomainError> {
		try_join_all(payment.work_items().iter().map(|work_item| async {
			let repository = self.fetch_repo_service.repo_by_id(work_item.repo_id()).await?;

			let previous_comment = self
				.github_service
				.get_latest_own_comment_on_issue(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
				)
				.await?;

			let comment_body =
				format_payment_confirmed_comment(&payment.id().pretty(), previous_comment);

			self.github_service
				.create_comment(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
					&comment_body,
				)
				.await?;

			self.github_service
				.close_issue(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
				)
				.await?;

			Ok::<(), DomainError>(())
		}))
		.await?;
		Ok(())
	}
}

fn format_payment_confirmed_comment(
	payment_id: &str,
	payment_requested_comment: Option<String>,
) -> String {
	match payment_requested_comment {
		Some(comment) => format!(
			"'{comment}'. Payment request #{payment_id} has been processed and payment is complete. See you around on OnlyDust."
		),
		None => format!(
			"Payment request #{payment_id} has been processed and payment is complete. See you around on OnlyDust.",
		),
	}
}
