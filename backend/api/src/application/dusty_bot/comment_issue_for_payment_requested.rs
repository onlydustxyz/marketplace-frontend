use std::sync::Arc;

use derive_more::Constructor;
use domain::{
	AuthUserRepository, GithubFetchRepoService, GithubFetchUserService, GithubServiceError,
	GithubUserId, PaymentId, PaymentReason, SubscriberCallbackError, UserId,
};

use crate::domain::GithubService;

#[derive(Constructor)]
pub struct Usecase {
	github_service: Arc<dyn GithubService>,
	fetch_user_service: Arc<dyn GithubFetchUserService>,
	auth_user_repository: Arc<dyn AuthUserRepository>,
	fetch_repo_service: Arc<dyn GithubFetchRepoService>,
}

impl Usecase {
	pub async fn comment_issue_for_payment_requested(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		hours_worked: u32,
		reason: PaymentReason,
	) -> Result<(), SubscriberCallbackError> {
		// TODO: parallelize calls within here
		for work_item in reason.work_items().iter() {
			let repository = self
				.fetch_repo_service
				.repo_by_id(work_item.repo_id())
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;

			let requestor = self.auth_user_repository.user_by_id(&requestor_id).await?;

			let recipient = self
				.fetch_user_service
				.user_by_id(&recipient_id)
				.await
				.map_err(SubscriberCallbackError::from_github_service_error)?;

			let comment_body = format_payment_requested_comment(
				&payment_id.pretty(),
				requestor.display_name(),
				recipient.login(),
				&amount_in_usd,
				reason.work_items().len(),
				&format_duration_worked(&hours_worked),
			);

			self.github_service
				.create_comment(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
					&comment_body,
				)
				.await
				.map_err::<SubscriberCallbackError, _>(
					FromGithubServiceError::from_github_service_error,
				)?;
		}
		Ok(())
	}
}

fn format_payment_requested_comment(
	payment_id: &str,
	requestor_login: &str,
	recipient_login: &str,
	amount: &u32,
	work_items_count: usize,
	worked_duration: &str,
) -> String {
	format!(
		"This item belongs to payment request #{payment_id} on OnlyDust from {requestor_login} to {recipient_login}, {work_items_count} items included, ${amount} for {worked_duration} of work.",
	)
}

pub fn format_duration_worked(duration_worked_hours: &u32) -> String {
	let number_of_days = duration_worked_hours / 8;
	let number_of_hours = duration_worked_hours - 8 * number_of_days;
	if number_of_days > 0 && number_of_hours > 0 {
		format!("{number_of_days} days and {number_of_hours} hours")
	} else if number_of_days > 0 {
		format!("{number_of_days} days")
	} else if number_of_hours > 0 {
		format!("{number_of_hours} hours")
	} else {
		panic!("Number of hours should be more than 0") // TODO: Do not panic
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
