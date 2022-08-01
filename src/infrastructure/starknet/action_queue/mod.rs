#[cfg(test)]
mod tests;

use crate::{
	domain::*,
	infrastructure::{database, starknet},
};

use log::{info, warn};
use std::{cmp::min, collections::VecDeque};

pub struct ActionQueue(VecDeque<Action>);

impl ActionQueue {
	pub fn new() -> Self {
		Self(VecDeque::new())
	}

	pub fn push(&mut self, action: Action) {
		self.0.push_front(action)
	}

	pub fn pop_n(&mut self, amount: usize) -> Vec<Action> {
		let mut ret = Vec::with_capacity(min(self.0.len(), amount));
		for _ in 0..amount {
			if let Some(v) = self.0.pop_back() {
				ret.push(v);
			} else {
				break;
			};
		}

		ret
	}
}

impl Default for ActionQueue {
	fn default() -> Self {
		Self::new()
	}
}

pub async fn execute_actions(database: &database::Client, actions: Vec<Action>) {
	let account = starknet::make_account_from_env();
	let starknet = starknet::Client::new(&account);

	match starknet.execute_actions(&actions).await {
		Ok(transaction_hash) => match store_action_result(database, &actions, &transaction_hash) {
			Ok(_) => info!("All actions executed successfully"),
			Err(e) => warn!("Cannot execute actions on database: {}", e.to_string()),
		},
		Err(e) => warn!(
			"Cannot execute actions on smart contract: {}",
			e.to_string()
		),
	}
}

fn store_action_result(
	contribution_repository: &dyn ContributionRepository,
	actions: &[Action],
	hash: &str,
) -> Result<(), DomainError> {
	for action in actions {
		match action {
			Action::CreateContribution {
				contribution: contribution_,
			} => contribution_repository.store(*contribution_.to_owned(), hash.to_owned()),

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
	}

	Ok(())
}
