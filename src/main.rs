mod routes;

use deathnote_contributions_feeder::connection;

use dotenv::dotenv;
use rocket::{launch, routes};

#[launch]
fn rocket() -> _ {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder()).expect("Unable to initialize octocrab");

    rocket::build()
        .manage(connection::init_pool())
        .mount("/", routes![routes::get_index, routes::new_project])
}
