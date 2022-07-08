mod routes;

use diesel_migrations::*;
use log::{info, warn};
use std::{
    collections::VecDeque,
    ops::{Deref, DerefMut},
    sync::{Arc, RwLock},
    thread,
    time::Duration,
};

use tokio::{
    signal,
    sync::oneshot::{self, error::TryRecvError},
};

use deathnote_contributions_feeder::{
    database::{self, connections::pg_connection, run_db_migrations},
    domain::Action,
    starknet,
};

use dotenv::dotenv;
use mockall::lazy_static;
use rocket::routes;

lazy_static! {
    pub static ref QUEUE: Arc<RwLock<ActionQueue>> = Arc::new(RwLock::new(ActionQueue::new()));
}

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("migrations");

#[tokio::main]
async fn main() {
    env_logger::init();
    dotenv().ok();
    run_db_migrations();
    octocrab::initialise(octocrab::Octocrab::builder()).expect("Unable to initialize octocrab");

    // Allow to gracefully exit kill all thread on ctrl+c
    let (shutdown_send, mut shutdown_recv) = oneshot::channel();
    let ctr_c_handler = tokio::spawn(async {
        let _ = signal::ctrl_c().await;
        // ctrl_c have been pushed or something unexpected happened
        let _ = shutdown_send.send(true);
    });

    // Regularly create a transaction with tasks stored in the queue
    let queue_handler = tokio::spawn(async move {
        loop {
            info!("Checking queue...");

            let mut next_actions = vec![];
            if let Ok(mut queue) = QUEUE.write() {
                next_actions = queue.deref_mut().take(100).collect::<Vec<_>>();
            };
            if !next_actions.is_empty() {
                execute_actions(next_actions).await;
            }

            // Look if shutdown signat have been issued
            match shutdown_recv.try_recv() {
                Ok(_) => return,
                Err(TryRecvError::Closed) => return,
                Err(TryRecvError::Empty) => {}
            }
            // Wait a bit and do it again
            thread::sleep(Duration::from_secs(5));
        }
    });

    let rocket_handler = rocket::build()
        .manage(pg_connection::init_pool())
        .attach(routes::cors::Cors)
        .mount(
            "/",
            routes![
                routes::cors::options_preflight_handler,
                routes::health::health_check,
                routes::get_index,
                routes::new_project,
                routes::list_projects,
                routes::create_contribution,
                routes::assign_contributor,
                routes::validate_contribution,
                routes::unassign_contributor,
            ],
        )
        .manage(QUEUE.clone())
        .launch();

    let (rocket_result, ctr_c_result, queue_result) =
        tokio::join!(rocket_handler, ctr_c_handler, queue_handler);
    let _ = rocket_result.unwrap();
    queue_result.unwrap();
    ctr_c_result.unwrap();

    info!("Gracefully shut down");
}

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

async fn execute_actions(actions: Vec<Action>) {
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
