use std::sync::Arc;

use async_trait::async_trait;
use chrono::Duration;
use derive_more::Constructor;
use domain::{
	Amount, AuthUserRepository, BudgetEvent, Event, GithubFetchRepoService, GithubFetchUserService,
	GithubServiceError, GithubUserId, PaymentEvent, PaymentId, PaymentWorkItem, ProjectEvent,
	SubscriberCallbackError, UserId,
};
use tracing::instrument;

use crate::domain::{EventListener, GithubCommentService};

#[derive(Constructor)]
pub struct DustyBot {
	comment_service: Arc<dyn GithubCommentService>,
	fetch_user_service: Arc<dyn GithubFetchUserService>,
	auth_user_repository: Arc<dyn AuthUserRepository>,
	fetch_repo_service: Arc<dyn GithubFetchRepoService>,
}

#[derive(Constructor)]
struct WorkInfo {
	work_items_count: usize,
	duration_worked: Duration,
}

impl DustyBot {
	async fn comment_issue(
		&self,
		work_item: &PaymentWorkItem,
		recipient_id: &GithubUserId,
		requestor_id: &UserId,
		payment_id: &PaymentId,
		amount: &Amount,
		work_info: WorkInfo,
	) -> Result<(), SubscriberCallbackError> {
		// TODO: parallelize calls within here
		let repository = self
			.fetch_repo_service
			.repo_by_id(work_item.repo_id())
			.await
			.map_err(SubscriberCallbackError::from_github_error)?;

		let requestor = self.auth_user_repository.user_by_id(requestor_id).await?;

		let recipient = self
			.fetch_user_service
			.user_by_id(recipient_id)
			.await
			.map_err(SubscriberCallbackError::from_github_error)?;

		let comment_body = format_comment(
			&payment_id.pretty(),
			requestor.display_name(),
			recipient.login(),
			amount,
			work_info.work_items_count,
			&format_duration_worked(&work_info.duration_worked),
		);

		self.comment_service
			.create_comment(
				repository.owner(),
				repository.name(),
				work_item.issue_number(),
				&comment_body,
			)
			.await
			.map_err::<SubscriberCallbackError, _>(FromGithubError::from_github_error)?;

		Ok(())
	}
}

fn format_comment(
	payment_id: &str,
	requestor_login: &str,
	recipient_login: &str,
	amount: &Amount,
	work_items_count: usize,
	worked_duration: &str,
) -> String {
	format!(
		"This item belongs to payment request #{payment_id} on OnlyDust from {requestor_login} to {recipient_login}, {work_items_count} items included, ${amount} for {worked_duration} of work.",
	)
}

#[async_trait]
impl EventListener for DustyBot {
	#[instrument(name = "dusty_bot", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Project(ProjectEvent::Budget {
			event:
				BudgetEvent::Payment {
					event:
						PaymentEvent::Requested {
							id: payment_id,
							requestor_id,
							recipient_id,
							amount,
							reason,
							duration_worked,
							..
						},
					..
				},
			..
		}) = event
		{
			// TODO: parallelize calls within here
			for work_item in reason.work_items().iter() {
				self.comment_issue(
					work_item,
					recipient_id,
					requestor_id,
					payment_id,
					amount,
					WorkInfo::new(reason.work_items().len(), *duration_worked),
				)
				.await?;
			}
		}
		Ok(())
	}
}

fn format_duration_worked(duration_worked_hours: &Duration) -> String {
	let number_of_days = duration_worked_hours.num_hours() / 8;
	let number_of_hours = duration_worked_hours.num_hours() - 8 * number_of_days;
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

trait FromGithubError {
	fn from_github_error(error: GithubServiceError) -> Self;
}

impl FromGithubError for SubscriberCallbackError {
	fn from_github_error(error: GithubServiceError) -> Self {
		olog::error!(error = error.to_string(), "Github Error");
		match error {
			GithubServiceError::NotFound(_) => SubscriberCallbackError::Discard(error.into()),
			GithubServiceError::MissingField(_) => SubscriberCallbackError::Discard(error.into()),
			GithubServiceError::Other(_) => SubscriberCallbackError::Discard(error.into()),
		}
	}
}
