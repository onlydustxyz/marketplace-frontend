use std::sync::Arc;

use anyhow::Result;
use domain::{Subscriber, SubscriberCallbackError};
use dotenv::dotenv;
use dusty_bot::{Action, Config, GithubService, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::{amqp::UniqueMessage, config, event_bus::consumer, github, tracing::Tracer};

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/dusty-bot/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "event-queue-worker")?;

	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());

	let dequeuer = consumer(config.amqp(), DUSTY_BOT_ACTION_QUEUE).await?;

	dequeuer
		.subscribe(|message: UniqueMessage<Action>| {
			process(github.clone(), message.payload().clone())
		})
		.await?;

	Ok(())
}

async fn process(
	github: Arc<dyn GithubService>,
	action: Action,
) -> Result<(), SubscriberCallbackError> {
	match action {
		Action::CreateComment {
			repo_owner,
			repo_name,
			issue_number,
			body,
		} => github.create_comment(&repo_owner, &repo_name, &issue_number, &body).await?,

		Action::CloseIssue {
			repo_owner,
			repo_name,
			issue_number,
		} => github.close_issue(&repo_owner, &repo_name, &issue_number).await?,
	}

	Ok(())
}
