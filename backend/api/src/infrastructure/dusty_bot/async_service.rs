use anyhow::Result;
use domain::{Destination, GithubIssueNumber, Publisher};
use dusty_bot::{Action, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::amqp::UniqueMessage;

use crate::domain::DustyBotAsyncService;

#[async_trait]
impl<P: Publisher<UniqueMessage<Action>>> DustyBotAsyncService for P {
	async fn close_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> Result<()> {
		self.publish(
			Destination::queue(DUSTY_BOT_ACTION_QUEUE),
			&UniqueMessage::new(Action::CloseIssue {
				repo_owner: repo_owner.to_string(),
				repo_name: repo_name.to_string(),
				issue_number: *issue_number,
			}),
		)
		.await?;

		Ok(())
	}
}
