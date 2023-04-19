use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::{
	AuthUserRepository, DomainError, GithubFetchRepoService, GithubFetchUserService, GithubUserId,
	PaymentId, PaymentReason, PaymentWorkItem, UserId,
};
use futures::future::try_join_all;
use indoc::formatdoc;
use num_format::{Locale, ToFormattedString};
use tokio::try_join;

use crate::domain::DustyBotAsyncService;

const HOURS_PER_DAY: u32 = 8;

#[derive(Constructor)]
pub struct Usecase {
	fetch_user_service: Arc<dyn GithubFetchUserService>,
	auth_user_repository: Arc<dyn AuthUserRepository>,
	fetch_repo_service: Arc<dyn GithubFetchRepoService>,
	dusty_bot_service: Arc<dyn DustyBotAsyncService>,
}

impl Usecase {
	#[allow(clippy::too_many_arguments)]
	async fn comment_single_issue(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		hours_worked: u32,
		work_item: &PaymentWorkItem,
		work_items_count: usize,
	) -> Result<(), DomainError> {
		let (repository, requestor, recipient) = try_join!(
			async {
				self.fetch_repo_service
					.repo_by_id(work_item.repo_id())
					.await
					.map_err(DomainError::from)
			},
			async {
				self.auth_user_repository
					.user_by_id(&requestor_id)
					.await
					.map_err(DomainError::from)
			},
			async {
				self.fetch_user_service
					.user_by_id(&recipient_id)
					.await
					.map_err(DomainError::from)
			}
		)?;

		let comment_body = format_comment(
			&payment_id.pretty(),
			requestor.display_name(),
			recipient.login(),
			&amount_in_usd.to_formatted_string(&Locale::en),
			&pluralize_word(work_items_count, "item").ok_or_else(|| {
				DomainError::InvalidInputs(anyhow!("Unable to format work item count"))
			})?,
			&format_duration_worked(hours_worked / HOURS_PER_DAY, hours_worked % HOURS_PER_DAY)
				.map_err(DomainError::InvalidInputs)?,
		);

		self.dusty_bot_service
			.create_comment(
				repository.owner(),
				repository.name(),
				work_item.issue_number(),
				&comment_body,
			)
			.await
			.map_err(DomainError::InternalError)?;

		Ok(())
	}

	pub async fn comment_issue_for_payment_requested(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		hours_worked: u32,
		reason: PaymentReason,
	) -> Result<(), DomainError> {
		let handles = reason.work_items().iter().map(|work_item| {
			self.comment_single_issue(
				payment_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				hours_worked,
				work_item,
				reason.work_items().len(),
			)
		});

		try_join_all(handles).await?;

		Ok(())
	}
}

fn format_comment(
	payment_id: &str,
	requestor_login: &str,
	recipient_login: &str,
	amount: &str,
	work_items_count: &str,
	worked_duration: &str,
) -> String {
	formatdoc!(
		"This item belongs to payment request #{payment_id} on [OnlyDust](https://www.onlydust.xyz/):
		 * from [{requestor_login}](https://www.onlydust.xyz/) to [{recipient_login}](https://www.onlydust.xyz/)
		 * {work_items_count} included
		 * ${amount} for {worked_duration} of work",
	)
}

pub fn format_duration_worked(days: u32, hours: u32) -> anyhow::Result<String> {
	if days == 0 && hours == 0 {
		Err(anyhow!("Work duration should be more than 0"))
	} else {
		Ok(vec![
			pluralize_word(days as usize, "day"),
			pluralize_word(hours as usize, "hour"),
		]
		.into_iter()
		.flatten()
		.collect::<Vec<_>>()
		.join(" and "))
	}
}

fn pluralize_word(quantity: usize, word: &str) -> Option<String> {
	match quantity {
		0 => None,
		1 => Some(format!("1 {word}")),
		quantity => Some(format!("{quantity} {word}s")),
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case(1, "1 hour")]
	#[case(4, "4 hours")]
	#[case(8, "1 day")]
	#[case(12, "1 day and 4 hours")]
	#[case(16, "2 days")]
	#[case(17, "2 days and 1 hour")]
	#[case(20, "2 days and 4 hours")]
	fn test_duration_worked(#[case] input: u32, #[case] expected: &str) {
		let result = format_duration_worked(input / HOURS_PER_DAY, input % HOURS_PER_DAY)
			.expect("Unable to format duration worked");
		assert_eq!(result, expected);
	}

	#[rstest]
	fn test_invalid_duration_worked() {
		format_duration_worked(0, 0).expect_err("Format duration should have failed");
	}
}
