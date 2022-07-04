use deathnote_contributions_feeder::{
    connection::{self, DbConn},
    database,
    domain::*,
    github,
};

use dotenv::dotenv;
use futures::stream::StreamExt;
use rocket::serde::{json::Json, Deserialize};
use rocket::{response::status, Responder};

#[macro_use]
extern crate rocket;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct Project<'r> {
    owner: &'r str,
    name: &'r str,
}

#[derive(Responder)]
enum Failure {
    #[response(status = 500, content_type = "json")]
    InternalServerError(String),
}

#[post("/projects", format = "application/json", data = "<project>")]
async fn new(
    project: Json<Project<'_>>,
    connection: DbConn,
) -> Result<status::Accepted<()>, Failure> {
    let filter = ProjectFilter {
        owner: Some(String::from(project.owner)),
        name: Some(String::from(project.name)),
    };

    let database = database::API::new(connection);
    let github = github::API::new();

    github
        .fetch(filter)
        .await
        .map_err(|error| Failure::InternalServerError(error.to_string()))?
        .for_each(|repo| async {
            database
                .log(repo)
                .await
                .expect("Unable to log repository in database");
        })
        .await;

    Ok(status::Accepted(Some(())))
}

#[get("/")]
fn index() -> &'static str {
    "Death Note Contributions Feeder REST API is running."
}

#[launch]
fn rocket() -> _ {
    env_logger::init();
    dotenv().ok();
    octocrab::initialise(octocrab::Octocrab::builder()).expect("Unable to initialize octocrab");

    rocket::build()
        .manage(connection::init_pool())
        .mount("/", routes![index, new])
}
