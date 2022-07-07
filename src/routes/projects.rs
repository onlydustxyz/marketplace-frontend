use deathnote_contributions_feeder::database::connections::pg_connection::DbConn;
use deathnote_contributions_feeder::domain::{Fetcher, Logger, ProjectFilter};
use deathnote_contributions_feeder::{database, github};

use futures::stream::StreamExt;
use rocket::get;
use rocket::post;
use rocket::response::status;
use rocket::serde::json::Json;
use serde::Deserialize;

use super::Failure;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Project<'r> {
    owner: &'r str,
    name: &'r str,
}

#[post("/projects", format = "application/json", data = "<project>")]
pub async fn new_project(
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

#[get("/projects")]
pub async fn list_projects(
    connection: DbConn,
) -> Result<Json<Vec<database::models::ProjectWithContributions>>, status::NotFound<String>> {
    let database = database::API::new(connection);
    let results = database
        .list_projects_with_contributions()
        .map_err(|error| status::NotFound(error.to_string()))?;
    let projects: Vec<database::models::ProjectWithContributions> = results.collect();

    Ok(Json(projects))
}
