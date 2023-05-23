use anyhow::Result;
use domain::{Destination, GithubIssueNumber, Publisher};
use dusty_bot::{Action, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::amqp::UniqueMessage;

/// Implementation of DustyBotAsyncService trait for any publisher that implements Publisher<UniqueMessage<Action>>.
#[async_trait]
impl<P: Publisher<UniqueMessage<Action>>> DustyBotAsyncService for P {
    /// Closes an issue in a GitHub repo.
    ///
    /// # Arguments
    ///
    /// * `repo_owner` - The owner of the repository.
    /// * `repo_name` - The name of the repository.
    /// * `issue_number` - The GitHub Issue number of the issue to close.
    ///
    /// # Returns
    ///
    /// Returns () if the message is successfully published to the Dusty Bot action queue.
    async fn close_issue(&self, repo_owner: &str, repo_name: &str, issue_number: &GithubIssueNumber) -> Result<()> {
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