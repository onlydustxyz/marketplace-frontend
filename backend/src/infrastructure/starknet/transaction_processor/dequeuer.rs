use futures::future::try_join_all;
use itertools::Itertools;
use log::{debug, error, info, warn};

use super::{StarknetError, TransactionProcessor};

use tokio::{
	sync::oneshot::{error::TryRecvError, Receiver},
	task::JoinHandle,
};

use std::{sync::Arc, thread, time::Duration};

pub use starknet::accounts::Account;

use crate::domain::*;

// TODO: refactor to event driven to remove dependency on database
pub fn spawn(
	transaction_processor: Arc<dyn TransactionProcessor>,
	contribution_repository: Arc<dyn ContributionRepository>,
	mut shutdown_recv: Receiver<bool>,
) -> JoinHandle<()> {
	let cloned_action_queue = transaction_processor.action_queue();

	tokio::spawn(async move {
		loop {
			debug!("Thread heartbeat");
			let next_actions = if let Ok(mut queue) = cloned_action_queue.write() {
				queue.pop_n(100)
			} else {
				vec![]
			};

			if !next_actions.is_empty() {
				let handles = transaction_processor.execute_actions(next_actions.clone()).await;

				match try_join_all(handles).await {
					Ok(results) => {
						results
							.into_iter()
							.enumerate()
							.map(|(index, result)| {
								handle_action_result(
									result,
									&*contribution_repository,
									&next_actions[index],
								)
							})
							.collect_vec();
					},
					Err(error) => error!("Unable to join child threads: {error}"),
				}
			}

			// Look if shutdown signat have been issued
			match shutdown_recv.try_recv() {
				Ok(_) => return,
				Err(TryRecvError::Closed) => return,
				Err(TryRecvError::Empty) => {},
			}

			// Wait a bit and do it again
			thread::sleep(Duration::from_secs(5));
		}
	})
}

fn handle_action_result(
	result: Result<String, StarknetError>,
	contribution_repository: &dyn ContributionRepository,
	action: &Action,
) {
	match result {
		Ok(transaction_hash) => {
			match store_action_result(contribution_repository, action, &transaction_hash) {
				Ok(_) => info!("All actions executed successfully"),
				Err(e) => {
					warn!("Cannot execute actions on database: {}", e.to_string())
				},
			}
		},
		Err(e) => warn!(
			"Cannot execute actions on smart contract: {}",
			e.to_string()
		),
	}
}

fn store_action_result(
	contribution_repository: &dyn ContributionRepository,
	action: &Action,
	hash: &str,
) -> Result<(), DomainError> {
	match action {
		Action::CreateContribution {
			contribution: contribution_,
		} => contribution_repository.create(contribution_.as_ref().to_owned(), hash.to_owned()),

		Action::AssignContributor {
			contribution_id: id_,
			contributor_id: contributor_id_,
		} => contribution_repository.update_contributor_and_status(
			id_.to_owned(),
			Some(*contributor_id_),
			ContributionStatus::Assigned,
			hash.to_owned(),
		),

		Action::UnassignContributor {
			contribution_id: id_,
		} => contribution_repository.update_contributor_and_status(
			id_.to_owned(),
			None,
			ContributionStatus::Open,
			hash.to_owned(),
		),

		Action::ValidateContribution {
			contribution_id: id_,
		} => contribution_repository.update_status(
			id_.to_owned(),
			ContributionStatus::Completed,
			hash.to_owned(),
		),
	}?;

	Ok(())
}

#[cfg(test)]
mod test {

	use super::{super::MockTransactionProcessor, *};
	use crate::infrastructure::starknet::{action_queue::ActionQueue, contracts::ContractError};
	use mockall::predicate::*;
	use starknet::core::types::FieldElement;
	use std::sync::RwLock;
	use tokio::sync::oneshot;
	use uuid::Uuid;

	#[tokio::test]
	async fn process_n_actions_in_parallel() {
		let mut transaction_processor = MockTransactionProcessor::new();
		let mut contribution_repository = MockContributionRepository::new();

		let contribution = Contribution {
			id: Uuid::from_u128(12).into(),
			onchain_id: String::from("0"),
			project_id: String::from("34"),
			contributor_id: None,
			title: None,
			description: None,
			status: ContributionStatus::Open,
			external_link: None,
			gate: 0,
			metadata: ContributionMetadata {
				difficulty: None,
				technology: None,
				duration: None,
				context: None,
				r#type: None,
			},
			validator: FieldElement::ZERO,
		};

		let mut action_queue = ActionQueue::new();
		action_queue.push(Action::CreateContribution {
			contribution: contribution.clone().into(),
		});
		action_queue.push(Action::AssignContributor {
			contribution_id: String::from("1"),
			contributor_id: ContributorId::from(11),
		});
		action_queue.push(Action::UnassignContributor {
			contribution_id: String::from("2"),
		});
		action_queue.push(Action::ValidateContribution {
			contribution_id: String::from("3"),
		});
		action_queue.push(Action::ValidateContribution {
			contribution_id: String::from("4"),
		});

		transaction_processor
			.expect_action_queue()
			.return_once(|| Arc::new(RwLock::new(action_queue)));

		let expected_actions = vec![
			Action::CreateContribution {
				contribution: contribution.clone().into(),
			},
			Action::AssignContributor {
				contribution_id: String::from("1"),
				contributor_id: ContributorId::from(11),
			},
			Action::UnassignContributor {
				contribution_id: String::from("2"),
			},
			Action::ValidateContribution {
				contribution_id: String::from("3"),
			},
			Action::ValidateContribution {
				contribution_id: String::from("4"),
			},
		];

		transaction_processor
			.expect_execute_actions()
			.with(eq(expected_actions))
			.returning(|_| {
				vec![
					tokio::spawn(async { Ok(String::from("0x0")) }),
					tokio::spawn(async { Ok(String::from("0x1")) }),
					tokio::spawn(async { Ok(String::from("0x2")) }),
					tokio::spawn(async {
						Err(ContractError::TransactionReverted(String::from("0x3")).into())
					}),
					tokio::spawn(async { Ok(String::from("0x4")) }),
				]
			});

		contribution_repository
			.expect_create()
			.with(eq(contribution), eq(String::from("0x0")))
			.returning(|_, _| Ok(()));

		contribution_repository
			.expect_update_contributor_and_status()
			.with(
				eq(String::from("1")),
				eq(Some(ContributorId::from(11))),
				eq(ContributionStatus::Assigned),
				eq(String::from("0x1")),
			)
			.returning(|_, _, _, _| Ok(()));

		contribution_repository
			.expect_update_contributor_and_status()
			.with(
				eq(String::from("2")),
				eq(None),
				eq(ContributionStatus::Open),
				eq(String::from("0x2")),
			)
			.returning(|_, _, _, _| Ok(()));

		contribution_repository
			.expect_update_status()
			.with(
				eq(String::from("4")),
				eq(ContributionStatus::Completed),
				eq(String::from("0x4")),
			)
			.returning(|_, _, _| Ok(()));

		let (shutdown_send, shutdown_recv) = oneshot::channel();

		let handle = spawn(
			Arc::new(transaction_processor),
			Arc::new(contribution_repository),
			shutdown_recv,
		);

		// Interrupt the thread after first loop
		let _ = shutdown_send.send(true);

		let join_result = tokio::join!(handle).0;
		assert!(join_result.is_ok(), "{:?}", join_result.err().unwrap());
	}
}
