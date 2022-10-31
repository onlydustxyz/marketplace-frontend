mod event;
use domain::EventStore;
pub use event::Event;

pub mod bus;

mod domain;
mod infrastructure;

use anyhow::Result;
use futures::TryFutureExt;
use log::debug;
use marketplace_domain::{Destination, Event as DomainEvent, Publisher, Subscriber};
use marketplace_infrastructure::{
	amqp::Bus,
	database::{init_pool, Client as DatabaseClient},
	event_bus::EXCHANGE_NAME,
};
use std::sync::Arc;

pub async fn main() -> Result<()> {
	let inbound_event_bus = bus::consumer().await?;
	let outbound_event_bus = Arc::new(Bus::default().await?);
	let database = Arc::new(DatabaseClient::new(init_pool()?));

	inbound_event_bus
		.subscribe(|event| {
			store(database.clone(), event)
				.and_then(|event| publish(event, outbound_event_bus.clone()))
		})
		.await?;

	Ok(())
}

async fn store(store: Arc<dyn EventStore>, event: Event) -> Result<Event> {
	if let Ok(pretty_event) = serde_json::to_string_pretty(&event) {
		debug!("[event-store] 📨 Received event: {}", pretty_event);
	}

	store.append(&event.aggregate_id(), vec![event.clone()])?;

	Ok(event)
}

async fn publish(event: Event, publisher: Arc<dyn Publisher<DomainEvent>>) -> Result<()> {
	publisher
		.publish(Destination::exchange(EXCHANGE_NAME, ""), &event.event)
		.await?;
	Ok(())
}

// TODO: remove once events are type safe
trait IdentifiableAggregate {
	fn aggregate_id(&self) -> String;
}

impl IdentifiableAggregate for Event {
	fn aggregate_id(&self) -> String {
		match &self.event {
			DomainEvent::Contribution(event) => match event {
				marketplace_domain::ContributionEvent::Deployed { contract_address } =>
					contract_address.to_string(),
				marketplace_domain::ContributionEvent::Created { id, .. }
				| marketplace_domain::ContributionEvent::Applied { id, .. }
				| marketplace_domain::ContributionEvent::ApplicationRefused { id, .. }
				| marketplace_domain::ContributionEvent::Assigned { id, .. }
				| marketplace_domain::ContributionEvent::Claimed { id, .. }
				| marketplace_domain::ContributionEvent::Unassigned { id }
				| marketplace_domain::ContributionEvent::Validated { id }
				| marketplace_domain::ContributionEvent::GateChanged { id, .. }
				| marketplace_domain::ContributionEvent::Closed { id }
				| marketplace_domain::ContributionEvent::Reopened { id } => id.to_string(),
			},
			DomainEvent::Project(event) => match event {
				marketplace_domain::ProjectEvent::MemberAdded { project_id, .. }
				| marketplace_domain::ProjectEvent::MemberRemoved { project_id, .. }
				| marketplace_domain::ProjectEvent::LeadContributorAdded { project_id, .. }
				| marketplace_domain::ProjectEvent::LeadContributorRemoved { project_id, .. } =>
					project_id.to_string(),
			},
			DomainEvent::Contributor(event) => match event {
				marketplace_domain::ContributorEvent::GithubAccountAssociated {
					contributor_account_address,
					..
				}
				| marketplace_domain::ContributorEvent::DiscordHandleRegistered {
					contributor_account_address,
					..
				} => contributor_account_address.to_string(),
			},
		}
	}
}
