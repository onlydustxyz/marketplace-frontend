mod logger;
use logger::Logger;

mod webhook;
use webhook::EventWebHook;

use crate::{
	domain::*,
	infrastructure::database::{
		BudgetRepository, BudgetSpenderRepository, PaymentRepository, PaymentRequestRepository,
		ProjectLeadRepository, ProjectRepository,
	},
	Config,
};
use anyhow::Result;
use domain::{Event, Subscriber, SubscriberCallbackError};
use infrastructure::{amqp::ConsumableBus, database, event_bus};
use std::sync::Arc;
use tokio::task::JoinHandle;

pub async fn spawn_all(
	config: &Config,
	reqwest: reqwest::Client,
	database: Arc<database::Client>,
) -> Result<Vec<JoinHandle<()>>> {
	let payment_repository = Arc::new(PaymentRepository::new(database.clone()));
	let payment_request_repository = Arc::new(PaymentRequestRepository::new(database.clone()));
	let project_repository = Arc::new(ProjectRepository::new(database.clone()));
	let budget_repository = Arc::new(BudgetRepository::new(database.clone()));
	let project_lead_repository = Arc::new(ProjectLeadRepository::new(database.clone()));
	let budget_spender_repository = Arc::new(BudgetSpenderRepository::new(database));

	let handles = [
		Logger.spawn(event_bus::consumer(&config.amqp, "logger").await?),
		EventWebHook::new(reqwest)
			.spawn(event_bus::consumer(&config.amqp, "event-webhooks").await?),
		PaymentProjector::new(payment_repository)
			.spawn(event_bus::consumer(&config.amqp, "payments").await?),
		PaymentRequestProjector::new(payment_request_repository)
			.spawn(event_bus::consumer(&config.amqp, "payment_requests").await?),
		ProjectProjector::new(project_repository, project_lead_repository)
			.spawn(event_bus::consumer(&config.amqp, "projects").await?),
		BudgetProjector::new(budget_repository, budget_spender_repository)
			.spawn(event_bus::consumer(&config.amqp, "budgets").await?),
	];

	Ok(handles.into())
}

trait Spawnable {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()>;
}

impl<EL: EventListener + 'static> Spawnable for EL {
	fn spawn(self, bus: ConsumableBus) -> JoinHandle<()> {
		let listener = Arc::new(self);
		tokio::spawn(async move {
			bus.subscribe(|event: Event| notify_event_listener(listener.clone(), event))
				.await
				.expect("Failed while trying to project received event");
		})
	}
}

async fn notify_event_listener(
	listener: Arc<dyn EventListener>,
	event: Event,
) -> Result<(), SubscriberCallbackError> {
	listener.on_event(&event).await.map_err(SubscriberCallbackError::Fatal)
}
