use deathnote_contributions_feeder::database::connections::pg_connection::DbConn;
use deathnote_contributions_feeder::domain::{Fetcher, Logger, ProjectFilter};
use deathnote_contributions_feeder::{database, github, starknet};

use futures::{
    future::join_all,
    stream::{self, StreamExt},
};
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
) -> Result<Json<Vec<api::Project>>, status::NotFound<String>> {
    let database = database::API::new(connection);

    let results = database
        .list_projects_with_contributions()
        .map_err(|error| status::NotFound(error.to_string()))?
        .map(build_project);
    let projects: Vec<_> = join_all(results).await;

    Ok(Json(projects))
}

async fn build_project(project: database::models::ProjectWithContributions) -> api::Project {
    let contributions = stream::iter(project.contributions.into_iter())
        .map(build_contribution)
        .collect::<Vec<_>>()
        .await;

    api::Project {
        id: project.id,
        title: project.name,
        contributions: join_all(contributions).await,
    }
}

async fn build_contribution(contribution: database::models::Contribution) -> api::Contribution {
    let account = starknet::make_account_from_env();
    let starknet = starknet::API::new(&account);

    let contributor_id = starknet
        .get_user_information(&contribution.author)
        .await
        .map(|c| format!("0x{:x}", c.id));

    api::Contribution {
        id: contribution.id,
        status: contribution.status.to_string(),
        gate: contribution.gate as u8,
        metadata: api::Metadata {
            assignee: contributor_id,
        },
    }
}

mod api {
    use serde::Serialize;

    #[derive(Serialize)]
    pub struct Project {
        pub id: String,
        pub title: String,
        pub contributions: Vec<Contribution>,
    }

    #[derive(Serialize)]
    pub struct Contribution {
        pub id: String,
        pub status: String,
        pub gate: u8,
        pub metadata: Metadata,
    }

    #[derive(Serialize)]
    pub struct Metadata {
        pub assignee: Option<String>,
    }
}
