use super::{
	apibara::{BlockHeader, TopicValue},
	*,
};
use mockall::predicate::*;
use rstest::*;
use starknet::core::utils::get_selector_from_name;
use tokio::sync::mpsc::error::TryRecvError;

#[fixture]
fn indexer_id() -> IndexerId {
	IndexerId::from("ID")
}

#[fixture]
fn block_hash() -> BlockHash {
	vec![12].into()
}

#[fixture]
fn block_number() -> u64 {
	123456
}

#[fixture]
fn channel() -> Channel {
	Channel::new()
}

#[fixture]
fn observer() -> MockBlockchainObserver {
	MockBlockchainObserver::new()
}

#[fixture]
fn apibara_event() -> apibara::Event {
	apibara::Event {
		event: Some(apibara::event::Event::Starknet(apibara::StarkNetEvent {
			topics: vec![TopicValue {
				value: get_selector_from_name("ContributionCreated")
					.unwrap()
					.to_bytes_be()
					.to_vec(),
			}],
			data: vec![
				TopicValue {
					value: vec![
						0, 65, 118, 135, 43, 113, 88, 60, 185, 188, 54, 113, 219, 40, 242, 110,
						127, 66, 106, 124, 7, 100, 97, 58, 8, 56, 187, 153, 239, 55, 58, 166,
					],
				},
				TopicValue {
					value: vec![
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 203,
					],
				},
				TopicValue { value: vec![0; 32] },
				TopicValue {
					value: vec![
						0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 6, 101, 25, 175,
					],
				},
			],
			address: vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 42, 42, 42,
			],
			transaction_hash: vec![
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 100, 0, 100,
			],
			log_index: 1,
		})),
	}
}

#[rstest]
#[tokio::test]
async fn can_send_a_connect_request(mut channel: Channel, indexer_id: IndexerId) {
	send_connect_request(&channel.tx, &indexer_id).await.unwrap();
	let request = channel.rx.recv().await.unwrap();
	assert_eq!(
		RequestMessage::Connect(ConnectIndexer {
			id: indexer_id.to_string(),
		}),
		request.message.unwrap()
	);
}

#[rstest]
#[tokio::test]
async fn can_handle_a_connect_response(
	indexer_id: IndexerId,
	mut channel: Channel,
	mut observer: MockBlockchainObserver,
) {
	let response = ConnectIndexerResponse {
		message: Some(ResponseMessage::Connected(IndexerConnected {
			indexer: Some(apibara::Indexer {
				id: indexer_id.to_string(),
				..Default::default()
			}),
			..Default::default()
		})),
	};

	observer.expect_on_connect().return_const(());

	let result = handle_response(response, &channel.tx, &observer).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
	assert_eq!(TryRecvError::Empty, channel.rx.try_recv().unwrap_err());
}

#[rstest]
#[tokio::test]
async fn can_handle_a_new_block_response(
	block_hash: BlockHash,
	block_number: u64,
	mut channel: Channel,
	mut observer: MockBlockchainObserver,
) {
	let response = ConnectIndexerResponse {
		message: Some(ResponseMessage::NewBlock(NewBlock {
			new_head: Some(BlockHeader {
				hash: block_hash.to_bytes(),
				number: block_number,
				..Default::default()
			}),
		})),
	};

	observer
		.expect_on_new_block()
		.with(eq(block_hash.clone()), eq(block_number))
		.return_const(());

	let result = handle_response(response, &channel.tx, &observer).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
	assert_eq!(TryRecvError::Empty, channel.rx.try_recv().unwrap_err());
}

#[rstest]
#[tokio::test]
async fn can_handle_a_new_events_response(
	mut channel: Channel,
	mut observer: MockBlockchainObserver,
	apibara_event: apibara::Event,
	block_hash: BlockHash,
	block_number: u64,
) {
	let response = ConnectIndexerResponse {
		message: Some(ResponseMessage::NewEvents(apibara::NewEvents {
			block: Some(BlockHeader {
				hash: block_hash.to_bytes(),
				number: block_number,
				..Default::default()
			}),
			events: vec![apibara_event.clone(), apibara_event, Default::default()],
		})),
	};

	observer.expect_on_new_event().times(2).return_const(());

	let result = handle_response(response, &channel.tx, &observer).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let request = channel.rx.try_recv().unwrap();
	assert_eq!(
		RequestMessage::Ack(AckBlock {
			hash: block_hash.to_bytes(),
		}),
		request.message.unwrap()
	);
}

#[rstest]
#[tokio::test]
async fn can_handle_a_new_reorg_response(
	mut channel: Channel,
	mut observer: MockBlockchainObserver,
) {
	let response = ConnectIndexerResponse {
		message: Some(ResponseMessage::Reorg(apibara::Reorg::default())),
	};

	observer.expect_on_reorg().return_const(());

	let result = handle_response(response, &channel.tx, &observer).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
	assert_eq!(TryRecvError::Empty, channel.rx.try_recv().unwrap_err());
}

#[rstest]
#[tokio::test]
async fn can_handle_an_empty_response(mut channel: Channel, observer: MockBlockchainObserver) {
	let response = ConnectIndexerResponse { message: None };

	let result = handle_response(response, &channel.tx, &observer).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
	assert_eq!(TryRecvError::Empty, channel.rx.try_recv().unwrap_err());
}
