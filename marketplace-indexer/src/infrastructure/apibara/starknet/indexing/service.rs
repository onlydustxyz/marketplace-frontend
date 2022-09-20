use super::{
	block::{AsEvents, TryIntoBlock},
	filter::Filtered,
	observed::Observed,
};
use crate::{
	domain::{BlockchainObserver, EventFilterRepository, IndexingService, IndexingServiceError},
	infrastructure::apibara::{
		proto::{stream_messages_response::Message as ResponseMessage, Data},
		ConnectedClient as ApibaraClient,
	},
};
use async_trait::async_trait;
use std::{ops::Deref, sync::Arc};

#[async_trait]
impl<O: BlockchainObserver> IndexingService for ApibaraClient<O> {
	async fn observe_events(
		&self,
		event_filter_repository: Arc<dyn EventFilterRepository>,
	) -> Result<(), IndexingServiceError> {
		let starting_sequence = 2_000; // TODO: persist indexing state

		self.stream_messages(starting_sequence, move |data| {
			let cloned_event_filter_repository = event_filter_repository.clone();
			async move {
				match data {
					ResponseMessage::Data(Data { data, .. }) if data.is_some() => {
						let block = data.unwrap().try_into_block()?;
						block.observed(&self.observer).await?;

						for event in
							block.as_events()?.filtered(cloned_event_filter_repository.deref())?
						{
							event.observed(&self.observer).await?;
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
