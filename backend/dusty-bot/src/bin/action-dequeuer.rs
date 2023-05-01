use std::{sync::Arc, time::Duration};

use anyhow::Result;
use domain::{Subscriber, SubscriberCallbackError};
use dotenv::dotenv;
use dusty_bot::{Action, Config, GithubService, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::{amqp::UniqueMessage, config, event_bus::consumer, github, tracing::Tracer};
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/dusty-bot/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "event-queue-worker")?;

	let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());

	let dequeuer = consumer(config.amqp(), DUSTY_BOT_ACTION_QUEUE).await?;

	dequeuer
		.subscribe(|message: UniqueMessage<Action>| {
			let github_clone = github.clone();
			async move {
				process(github_clone.clone(), message.payload().clone()).await?;
				throttle().await;
				Ok(())
			}
		})
		.await?;

	Ok(())
}

async fn process(
	github: Arc<dyn GithubService>,
	action: Action,
) -> Result<(), SubscriberCallbackError> {
	info!(action = action.to_string(), "Prcoessing DustyBot action");

	match action {
		Action::CloseIssue {
			repo_owner,
			repo_name,
			issue_number,
		} => github.close_issue(&repo_owner, &repo_name, &issue_number).await?,
	}

	Ok(())
}

async fn throttle() {
	let seconds = std::env::var("DUSTY_BOT_THROTTLE_DURATION")
		.unwrap_or_default()
		.parse()
		.unwrap_or(1);

	tokio::time::sleep(Duration::from_secs(seconds)).await;
}
