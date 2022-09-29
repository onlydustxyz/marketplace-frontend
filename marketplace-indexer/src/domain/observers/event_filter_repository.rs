use super::*;
use log::error;
use std::sync::Arc;

pub struct EventFilterRepositoryObserver {
	event_filter_repository: Arc<dyn EventFilterRepository>,
}

impl EventFilterRepositoryObserver {
	pub fn new(event_filter_repository: Arc<dyn EventFilterRepository>) -> Self {
		Self {
			event_filter_repository,
		}
	}
}

#[async_trait]
impl Observer for EventFilterRepositoryObserver {
	async fn on_new_event(&self, observed_event: &ObservedEvent, _block_number: u64) {
		if let Event::Contribution(ContributionEvent::Deployed { contract_address }) =
			&observed_event.event
		{
			if let Err(error) = self.event_filter_repository.insert(EventFilter {
				indexer_id: observed_event.clone().indexer_id,
				source_contract: contract_address.clone(),
			}) {
				error!(
					"Failed while trying to insert new contribution deployed in event filter respository: {error}"
				);
			}
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	#[rstest]
	async fn on_new_event() {
		let contract_address: ContractAddress =
			"0x047993152cd854642e20bacd406cf4fbecf71ea852111edd6b0c4cb575f9cfb2"
				.parse()
				.unwrap();

		let indexer_id = String::from("starknet");
		let event = Event::Contribution(ContributionEvent::Deployed {
			contract_address: contract_address.clone(),
		});

		let mut repository = MockEventFilterRepository::new();
		repository
			.expect_insert()
			.once()
			.with(eq(EventFilter {
				indexer_id: indexer_id.clone(),
				source_contract: contract_address,
			}))
			.returning(|_| Ok(()));

		let observer = EventFilterRepositoryObserver::new(Arc::new(repository));
		observer
			.on_new_event(
				&ObservedEvent {
					event,
					indexer_id,
					..Default::default()
				},
				0,
			)
			.await;
	}
}
