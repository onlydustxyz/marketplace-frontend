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
		ConnectedClient as ApibaraClient,
	},
};
use async_trait::async_trait;
use std::sync::Arc;

const INDEXER_ID: &str = "starknet";

#[async_trait]
impl<OBS: BlockchainObserver> IndexingService for ApibaraClient<OBS> {
	async fn observe_events(
		&self,
		event_filter_repository: Arc<dyn EventFilterRepository>,
	) -> Result<(), IndexingServiceError> {
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
