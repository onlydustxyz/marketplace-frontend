#[cfg(test)]
mod tests;

use async_trait::async_trait;
use futures::future::join_all;
use std::sync::Arc;
use tokio::sync::mpsc::{self, Receiver, Sender};
use tokio_stream::wrappers::ReceiverStream;

use super::{
	apibara::{
		connect_indexer_request::Message as RequestMessage,
		connect_indexer_response::Message as ResponseMessage, AckBlock, ConnectIndexer,
		ConnectIndexerRequest, ConnectIndexerResponse, IndexerConnected, NewBlock, NewEvents,
	},
	*,
};
use crate::domain::*;

#[async_trait]
impl IndexingService for Client {
	async fn fetch_new_events(
		&self,
		indexer: Indexer,
		observer: Arc<dyn BlockchainObserver>,
	) -> Result<(), IndexingServiceError> {
		let channel = Channel::new();
		send_connect_request(&channel.tx, &indexer.id).await?;

		let mut response_stream = self
			.0
			.write()
			.await
			.connect_indexer(ReceiverStream::new(channel.rx))
			.await
			.map_err(|e| IndexingServiceError::Connection {
				id: indexer.id.clone(),
				details: e.to_string(),
			})?
			.into_inner();

		loop {
			match response_stream
				.message()
				.await
				.map_err(|error| IndexingServiceError::Receive(error.to_string()))?
			{
				Some(response) => handle_response(response, &channel.tx, &*observer).await?,
				None => continue,
			}
		}
	}
}

struct Channel {
	tx: Sender<ConnectIndexerRequest>,
	rx: Receiver<ConnectIndexerRequest>,
}

impl Channel {
	pub fn new() -> Self {
		let (tx, rx) = mpsc::channel(64);
		Self { tx, rx }
	}
}

async fn send_connect_request(
	sender: &Sender<ConnectIndexerRequest>,
	indexer_id: &IndexerId,
) -> Result<(), IndexingServiceError> {
	send(sender, connect_request(indexer_id)).await
}

async fn send_ack_request(
	sender: &Sender<ConnectIndexerRequest>,
	block_hash: &BlockHash,
) -> Result<(), IndexingServiceError> {
	send(sender, ack_block(block_hash)).await
}

async fn send<T>(sender: &Sender<T>, request: T) -> Result<(), IndexingServiceError> {
	sender
		.send(request)
		.await
		.map_err(|error| IndexingServiceError::Send(error.to_string()))
}

fn connect_request(indexer_id: &IndexerId) -> ConnectIndexerRequest {
	ConnectIndexerRequest {
		message: Some(RequestMessage::Connect(ConnectIndexer {
			id: indexer_id.to_string(),
		})),
	}
}

fn ack_block(block_hash: &BlockHash) -> ConnectIndexerRequest {
	ConnectIndexerRequest {
		message: Some(RequestMessage::Ack(AckBlock {
			hash: block_hash.to_bytes(),
		})),
	}
}

async fn handle_response(
	response: ConnectIndexerResponse,
	sender: &Sender<ConnectIndexerRequest>,
	observer: &dyn BlockchainObserver,
) -> Result<(), IndexingServiceError> {
	match response.message {
		Some(ResponseMessage::Connected(IndexerConnected {
			indexer: Some(indexer),
			version: _,
		})) => {
			observer.on_connect(&indexer.id.into()).await;
			Ok(())
		},

		Some(ResponseMessage::NewBlock(NewBlock {
			new_head: Some(new_head),
		})) => {
			let block_hash = BlockHash::from(new_head.hash);
			observer.on_new_block(&block_hash, new_head.number).await;
			Ok(())
		},

		Some(ResponseMessage::Reorg(_)) => {
			observer.on_reorg().await;
			Ok(())
		},

		Some(ResponseMessage::NewEvents(NewEvents { block, events })) => {
			if let Some(block_head) = block {
				join_all(events.into_iter().map(|event| async {
					if let Ok(event) = (event, &block_head).try_into() {
						observer.on_new_event(&event, block_head.number).await;
					}
				}))
				.await;

				send_ack_request(sender, &block_head.hash.into()).await
			} else {
				Ok(())
			}
		},

		_ => Ok(()),
	}
}
