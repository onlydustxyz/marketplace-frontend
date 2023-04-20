use std::sync::Arc;

use derive_more::Constructor;
use domain::{DomainError, GithubFetchService, Payment, PaymentId, PaymentWorkItem};
use futures::future::try_join_all;
use tokio::try_join;

use crate::domain::{DustyBotAsyncService, GithubService};

#[derive(Constructor)]
pub struct Usecase {
	github_service: Arc<dyn GithubService>,
	fetch_service: Arc<dyn GithubFetchService>,
	dusty_bot_service: Arc<dyn DustyBotAsyncService>,
}

impl Usecase {
	async fn comment_single_issue(
		&self,
		payment_id: &PaymentId,
		work_item: &PaymentWorkItem,
	) -> Result<(), DomainError> {
		let repository = self.fetch_service.repo_by_id(work_item.repo_id()).await?;

		let previous_comment = self
			.github_service
			.get_latest_own_comment_on_issue(
				repository.owner(),
				repository.name(),
				work_item.issue_number(),
			)
			.await?;

		let comment_body = format_comment(&payment_id.pretty(), previous_comment);

		try_join!(
			self.dusty_bot_service.create_comment(
				repository.owner(),
				repository.name(),
				work_item.issue_number(),
				&comment_body,
			),
			self.dusty_bot_service.close_issue(
				repository.owner(),
				repository.name(),
				work_item.issue_number(),
			)
		)
		.map_err(DomainError::InternalError)?;

		Ok(())
	}

	pub async fn comment_issue_for_payment_processed(
		&self,
		payment: &Payment,
	) -> Result<(), DomainError> {
		let handles = payment
			.work_items()
			.iter()
			.map(|work_item| self.comment_single_issue(payment.id(), work_item));

		try_join_all(handles).await?;
		Ok(())
	}
}

fn format_comment(payment_id: &str, previous_comment: Option<String>) -> String {
	format!(
		"{}Payment request #{payment_id} has been processed and payment is complete. See you around on [OnlyDust](https://www.onlydust.xyz/).",
		previous_comment.map(quote).unwrap_or_default()
	)
}

fn quote(text: String) -> String {
	format!("> {}\n\n", text.replace('\n', "\n> "))
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_formatting_with_previous_comment() {
		let comment = format_comment("12AB5", Some("Previous comment".to_string()));
		assert_eq!(
			comment,
			"> Previous comment\n\nPayment request #12AB5 has been processed and payment is complete. See you around on [OnlyDust](https://www.onlydust.xyz/)."
		)
	}

	#[test]
	fn test_formatting_with_previous_multiline_comment() {
		let comment = format_comment("12AB5", Some("Previous comment\nSecond line".to_string()));
		assert_eq!(
			comment,
			"> Previous comment\n> Second line\n\nPayment request #12AB5 has been processed and payment is complete. See you around on [OnlyDust](https://www.onlydust.xyz/)."
		)
	}

	#[test]
	fn test_formatting_without_previous_comment() {
		let comment = format_comment("12AB5", None);
		assert_eq!(
			comment,
			"Payment request #12AB5 has been processed and payment is complete. See you around on [OnlyDust](https://www.onlydust.xyz/)."
		)
	}
}
