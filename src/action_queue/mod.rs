#[cfg(test)]
mod tests;

use deathnote_contributions_feeder::{
    database::{self},
    domain::Action,
    infrastructure::database::ConnectionPool,
    starknet,
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

pub async fn execute_actions(database_pool: &ConnectionPool, actions: Vec<Action>) {
    let account = starknet::make_account_from_env();
    let starknet = starknet::API::new(&account);
    let database = database::API::new(database_pool);

    match starknet.execute_actions(&actions).await {
        Ok(transaction_hash) => match database.execute_actions(&actions, &transaction_hash) {
            Ok(_) => info!("All actions executed successfully"),
            Err(e) => warn!("Cannot execute actions on database: {}", e),
        },
        Err(e) => warn!("Cannot execute actions on smart contract: {}", e),
    }
}
