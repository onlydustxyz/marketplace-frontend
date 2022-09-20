use super::{
	block::{AsEvents, TryIntoBlock},
	filter::Filtered,
	observed::Observed,
};
use crate::{
	domain::{BlockchainObserver, EventFilterRepository, IndexingService, IndexingServiceError},
	infrastructure::apibara::{
		proto::{connect_response::Message as ResponseMessage, Data},
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
		loop {
			let data = self
				.stream_messages()
				.await
				.map_err(anyhow::Error::msg)
				.map_err(IndexingServiceError::Stream)?;

			match data {
				ResponseMessage::Data(Data { data, .. }) if data.is_some() => {
					let block = data.unwrap().try_into_block()?;
					block.observed(&self.observer).await?;

					for event in block.as_events()?.filtered(event_filter_repository.deref())? {
						event.observed(&self.observer).await?;
					}
				},

				ResponseMessage::Invalidate(invalidate) =>
					invalidate.observed(&self.observer).await?,

				_ => (),
			};
		}
	}
}
