use deathnote_contributions_feeder::{
    database::{self},
    domain::Action,
    starknet,
};

use log::{info, warn};
use std::{
    collections::VecDeque,
    ops::{Deref, DerefMut},
};

pub struct ActionQueue(VecDeque<Action>);

impl ActionQueue {
    pub fn new() -> Self {
        Self(VecDeque::new())
    }
}

impl Default for ActionQueue {
    fn default() -> Self {
        Self::new()
    }
}

impl Deref for ActionQueue {
    type Target = VecDeque<Action>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ActionQueue {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl Iterator for ActionQueue {
    type Item = Action;

    fn next(&mut self) -> Option<Self::Item> {
        self.pop_back()
    }
}

pub async fn execute_actions(actions: Vec<Action>) {
    let account = starknet::make_account_from_env();
    let starknet = starknet::API::new(&account);
    let database = database::API::default();

    match starknet.execute_actions(&actions).await {
        Ok(transaction_hash) => match database.execute_actions(&actions, &transaction_hash) {
            Ok(_) => info!("All actions executed successfully"),
            Err(e) => warn!("Cannot execute actions on database: {}", e),
        },
        Err(e) => warn!("Cannot execute actions on smart contract: {}", e),
    }
}
