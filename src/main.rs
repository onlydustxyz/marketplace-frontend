mod routes;

use deathnote_contributions_feeder::database::connections::pg_connection;

use dotenv::dotenv;
use rocket::{launch, routes};

#[macro_use]
extern crate rocket;

#[launch]
fn rocket() -> _ {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder()).expect("Unable to initialize octocrab");

    rocket::build()
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
}
