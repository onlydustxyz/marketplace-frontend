use std::sync::Arc;

use async_trait::async_trait;
use chrono::Duration;
use derive_more::Constructor;
use domain::{
	Amount, BudgetEvent, Event, GithubFetchRepoService, GithubFetchUserService, GithubServiceError,
	GithubUserId, PaymentEvent, PaymentId, PaymentWorkItem, ProjectEvent, SubscriberCallbackError,
	UserId,
};
use tracing::instrument;

use crate::domain::{EventListener, GithubCommentService};

#[derive(Constructor)]
pub struct DustyBot {
	comment_service: Arc<dyn GithubCommentService>,
	fetch_user_service: Arc<dyn GithubFetchUserService>,
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
		let repository =
			self.fetch_repo_service
				.repo_by_id(work_item.repo_id())
				.await
				.map_err::<SubscriberCallbackError, _>(FromGithubError::from_github_error)?;
		let recipient_login = self
			.fetch_user_service
			.user_by_id(recipient_id)
			.await
			.map_err::<SubscriberCallbackError, _>(FromGithubError::from_github_error)?
			.login()
			.clone();
		let id = payment_id.pretty();
		let time_worked_string = format_duration_worked(&work_info.duration_worked);
		let work_items_count = work_info.work_items_count;
		self.comment_service.create_comment(
							    repository.owner(),
 							    repository.name(),
							    work_item.issue_number(),
		    &format!("This item belongs to payment request #{id} on OnlyDust from {requestor_id} to {recipient_login}, {work_items_count} items included, ${amount} {time_worked_string}")).await.map_err::<SubscriberCallbackError, _>(FromGithubError::from_github_error)?;
		Ok(())
	}
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
		format!("for {number_of_days} days and {number_of_hours} hours of work")
	} else if number_of_days > 0 {
		format!("for {number_of_days} days of work")
	} else if number_of_hours > 0 {
		format!("for {number_of_hours} hours of work")
	} else {
		panic!("Number of hours should be more than 0")
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
