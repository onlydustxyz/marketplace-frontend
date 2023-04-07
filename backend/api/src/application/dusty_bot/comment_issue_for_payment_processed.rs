use std::sync::Arc;

use derive_more::Constructor;
use domain::{GithubFetchRepoService, GithubServiceError, Payment, SubscriberCallbackError};

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
	) -> Result<(), SubscriberCallbackError> {
		for work_item in payment.work_items().iter() {
			// TODO: parallelize calls within here
			let repository = self
				.fetch_repo_service
				.repo_by_id(work_item.repo_id())
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;

			let previous_comment = self
				.github_service
				.get_latest_own_comment_on_issue(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
				)
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;

			let comment_body =
				format_payment_confirmed_comment(&payment.id().pretty(), previous_comment);

			self.github_service
				.create_comment(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
					&comment_body,
				)
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;

			self.github_service
				.close_issue(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
				)
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;
		}
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

trait FromGithubServiceError {
	fn from_github_service_error(error: GithubServiceError) -> Self;
}

impl FromGithubServiceError for SubscriberCallbackError {
	fn from_github_service_error(error: GithubServiceError) -> Self {
		match error {
			GithubServiceError::MissingField(err) =>
				SubscriberCallbackError::Discard(anyhow::anyhow!(err)),
			GithubServiceError::NotFound(err) => SubscriberCallbackError::Discard(err),
			GithubServiceError::Other(err) => SubscriberCallbackError::Discard(err),
		}
	}
}
