mod routes;

use log::info;
use std::{
    collections::VecDeque,
    ops::DerefMut,
    sync::{Arc, RwLock},
    thread,
    time::Duration,
};

use tokio::{
    signal,
    sync::oneshot::{self, error::TryRecvError},
};

use deathnote_contributions_feeder::database::connections::pg_connection;

use dotenv::dotenv;
use mockall::lazy_static;
use rocket::routes;

lazy_static! {
    pub static ref QUEUE: Arc<RwLock<VecDeque<String>>> = Arc::new(RwLock::new(VecDeque::new()));
}

#[macro_use]
extern crate rocket;

#[tokio::main]
async fn main() {
    env_logger::init();
    dotenv().ok();
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
            info!("Batching task in one transaction");

            if let Ok(mut queue) = QUEUE.write() {
                do_stuff(queue.deref_mut());
            };

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
            ],
        )
        .mount("", routes![routes::create_contribution,])
        .manage(QUEUE.clone())
        .launch();

    let (rocket_result, ctr_c_result, queue_result) =
        tokio::join!(rocket_handler, ctr_c_handler, queue_handler);
    let _ = rocket_result.unwrap();
    queue_result.unwrap();
    ctr_c_result.unwrap();

    info!("Gracefully shut down");
}

fn do_stuff(_queue: &mut VecDeque<String>) {}
