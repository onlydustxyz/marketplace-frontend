use super::{
	block::{AsEvents, TryIntoBlock},
	observed::Observed,
};
use crate::{
	domain::{
		BlockchainObserver, EventFilter, EventFilterRepository, IndexingService,
		IndexingServiceError,
	},
	infrastructure::apibara::{
		proto::{stream_messages_response::Message as ResponseMessage, Data},
		starknet::INDEXER_ID,
		ConnectedClient as ApibaraClient,
	},
};
use async_trait::async_trait;
use marketplace_domain::ContractAddress;
use std::sync::Arc;

#[async_trait]
impl<OBS: BlockchainObserver> IndexingService for ApibaraClient<OBS> {
	async fn observe_events(
		&self,
		event_filter_repository: Arc<dyn EventFilterRepository>,
	) -> Result<(), IndexingServiceError> {
		// Make sure the legacy contract is present before streaming messages
		event_filter_repository
			.insert_if_not_exist(EventFilter {
				indexer_id: INDEXER_ID.into(),
				source_contract: contributions_contract(),
			})
			.ok(); // ignore error as will be present after first run

		self.stream_messages(INDEXER_ID, move |data| {
			let cloned_event_filter_repository = event_filter_repository.clone();
			async move {
				match data {
					ResponseMessage::Data(Data { data, .. }) if data.is_some() => {
						let block = data.unwrap().try_into_block()?;
						block.observed(&self.observer).await?;

						let events = block.as_events()?;
						for event in events {
							if cloned_event_filter_repository.matches(&EventFilter {
								indexer_id: INDEXER_ID.into(),
								source_contract: event.from_address.clone(),
							})? {
								event.observed(&self.observer).await?;
							}
						}
					},

					ResponseMessage::Invalidate(invalidate) =>
						invalidate.observed(&self.observer).await?,

					_ => (),
				};
				Ok(())
			}
		})
		.await
		.map_err(anyhow::Error::msg)
		.map_err(IndexingServiceError::Stream)?;

		Ok(())
	}
}

fn contributions_contract() -> ContractAddress {
	std::env::var("CONTRIBUTIONS_ADDRESS")
		.expect("CONTRIBUTIONS_ADDRESS must be set")
		.parse()
		.expect("CONTRIBUTIONS_ADDRESS is not a valid contract address")
}
