use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::{
	AuthUserRepository, DomainError, GithubFetchRepoService, GithubFetchUserService, GithubUserId,
	PaymentId, PaymentReason, UserId,
};
use futures::future::try_join_all;

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
	) -> Result<(), DomainError> {
		try_join_all(reason.work_items().iter().map(|work_item| async {
			let repository = self.fetch_repo_service.repo_by_id(work_item.repo_id()).await?;

			let requestor = self.auth_user_repository.user_by_id(&requestor_id).await?;

			let recipient = self.fetch_user_service.user_by_id(&recipient_id).await?;

			let comment_body = format_payment_requested_comment(
				&payment_id.pretty(),
				requestor.display_name(),
				recipient.login(),
				&amount_in_usd,
				reason.work_items().len(),
				&format_duration_worked(&hours_worked).map_err(DomainError::InvalidInputs)?,
			);

			self.github_service
				.create_comment(
					repository.owner(),
					repository.name(),
					work_item.issue_number(),
					&comment_body,
				)
				.await?;
			Ok::<(), DomainError>(())
		}))
		.await?;
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

pub fn format_duration_worked(duration_worked_hours: &u32) -> anyhow::Result<String> {
	let number_of_days = duration_worked_hours / 8;
	let number_of_hours = duration_worked_hours - 8 * number_of_days;
	let days_string = pluralize_word(&number_of_days, "day");
	let hours_string = pluralize_word(&number_of_hours, "hour");
	if number_of_days > 0 && number_of_hours > 0 {
		Ok(format!("{days_string} and {hours_string}"))
	} else if number_of_days > 0 {
		Ok(days_string)
	} else if number_of_hours > 0 {
		Ok(hours_string)
	} else {
		Err(anyhow!("Number of hours should be more than 0"))
	}
}

fn pluralize_word(quantity: &u32, word: &str) -> String {
	if *quantity == 0 {
		String::new()
	} else if *quantity == 1 {
		format!("1 {word}")
	} else {
		format!("{quantity} {word}s")
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use crate::application::dusty_bot::comment_issue_for_payment_requested::format_duration_worked;

	#[rstest]
	#[case(4, String::from("4 hours"))]
	#[case(8, String::from("1 day"))]
	#[case(12, String::from("1 day and 4 hours"))]
	#[case(16, String::from("2 days"))]
	#[case(20, String::from("2 days and 4 hours"))]
	fn test_duration_worked(#[case] input: u32, #[case] expected: String) {
		let result = format_duration_worked(&input);
		match result {
			Ok(result_string) => {
				assert_eq!(result_string, expected)
			},
			Err(_) => {
				assert!(result.is_err())
			},
		}
	}
}
