use anyhow::Result;
use domain::{Destination, GithubIssueNumber, Publisher};
use dusty_bot::{Action, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::amqp::UniqueMessage;

use crate::domain::DustyBotAsyncService;

#[async_trait]
impl<P: Publisher<UniqueMessage<Action>>> DustyBotAsyncService for P {
	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> Result<()> {
		self.publish(
			Destination::queue(DUSTY_BOT_ACTION_QUEUE),
			&UniqueMessage::new(Action::CloseIssue {
				repo_owner,
				repo_name,
				issue_number,
			}),
		)
		.await?;

		Ok(())
	}
}
