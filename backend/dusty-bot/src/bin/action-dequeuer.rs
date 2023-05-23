use std::{sync::Arc, time::Duration};

use anyhow::Result;
use domain::{Subscriber, SubscriberCallbackError};
use dotenv::dotenv;
use dusty_bot::{Action, Config, GithubService, DUSTY_BOT_ACTION_QUEUE};
use infrastructure::{amqp::UniqueMessage, config, event_bus::consumer, github, tracing::Tracer};
use olog::info;

/// Runs an event queue worker that listens to a specific action queue and processes incoming actions asynchronously.
#[tokio::main]
async fn main() -> Result<()> {
    // Load environment variables from .env file if present
    dotenv().ok();

    // Load config from YAML file
    let config: Config = config::load("backend/dusty-bot/app.yaml")?;

    // Initialize a tracer using the config and set the span name to "event-queue-worker"
    let _tracer = Tracer::init(config.tracer(), "event-queue-worker")?;

    // Create a new Arc-wrapped RoundRobinClient for Github API requests using the config
    let github = Arc::<github::Client>::new(github::RoundRobinClient::new(config.github())?.into());

    // Create a new AMQP consumer for the DUSTY_BOT_ACTION_QUEUE
    let dequeuer = consumer(config.amqp(), DUSTY_BOT_ACTION_QUEUE).await?;

    // Subscribe to incoming messages from the AMQP consumer and process each one asynchronously
    dequeuer
        .subscribe(|message: UniqueMessage<Action>| {
            let github_clone = github.clone();
            async move {
                // Process the incoming action using the GithubService and the action payload
                process(github_clone.clone(), message.payload().clone()).await?;

                // Throttle the worker to avoid rate-limiting issues with Github API
                throttle().await;

                Ok(())
            }
        })
        .await?;

    Ok(())
}

/// Processes a DustyBot specific action using the GithubService and the action payload.
///
/// # Arguments
///
/// * `github` - An Arc-wrapped GithubService instance for API requests.
/// * `action` - An Action enum that represents the action to be performed.
///
/// # Errors
///
/// Returns a SubscriberCallbackError if the API requests fail.
async fn process(
    github: Arc<dyn GithubService>,
    action: Action,
) -> Result<(), SubscriberCallbackError> {
    info!(action = action.to_string(), "Processing DustyBot action");

    match action {
        // If the action is to close an issue, call the close_issue API request using the GithubService instance.
        Action::CloseIssue {
            repo_owner,
            repo_name,
            issue_number,
        } => github.close_issue(&repo_owner, &repo_name, &issue_number).await?,

        // Add support for other DustyBot actions here
    }

    Ok(())
}

/// Throttles the worker for a duration specified in the DUSTY_BOT_THROTTLE_DURATION environment variable.
///
/// # Arguments
///
/// None
async fn throttle() {
    let seconds = std::env::var("DUSTY_BOT_THROTTLE_DURATION")
        .unwrap_or_default()
        .parse()
        .unwrap_or(1);

    tokio::time::sleep(Duration::from_secs(seconds)).await;
}