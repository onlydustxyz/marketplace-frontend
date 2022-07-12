use std::collections::HashMap;

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
use url::Url;

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
    let github_repository = github::API::new()
        .repository_by_id(&project.id)
        .await
        .expect("Unable to fetch repository from github");

    let contributions = stream::iter(project.contributions.into_iter())
        .map(build_contribution)
        .collect::<Vec<_>>()
        .await;

    api::Project {
        id: project.id,
        title: project.name.clone(),
        description: github_repository.description,
        logo: github_repository.owner.unwrap().avatar_url,
        github_link: github_repository.html_url.unwrap_or(
            Url::parse(&format!(
                "https://github.com/{}/{}",
                project.owner, project.name
            ))
            .unwrap(),
        ),
        contributions: join_all(contributions).await,
    }
}

async fn build_contribution(contribution: database::models::Contribution) -> api::Contribution {
    let account = starknet::make_account_from_env();
    let starknet = starknet::API::new(&account);

    let contributor_id = match contribution.author {
        author if !author.is_empty() => starknet
            .get_user_information(&author)
            .await
            .map(|c| format!("0x{:x}", c.id)),
        _ => None,
    };

    let github = github::API::new();
    let github_issue = github
        .issue(&contribution.id)
        .await
        .expect("Cannot find issue in github");

    let labels: HashMap<String, String> = github_issue
        .labels
        .into_iter()
        .filter_map(|label| {
            let splitted: Vec<_> = label.name.split(':').collect();
            if splitted.len() == 2 {
                Some((splitted[0].trim().to_owned(), splitted[1].trim().to_owned()))
            } else {
                None
            }
        })
        .collect();

    api::Contribution {
        id: contribution.id,
        title: github_issue.title,
        description: github_issue.body.unwrap_or_default(),
        github_link: github_issue.html_url,
        status: contribution.status.to_string(),
        gate: contribution.gate as u8,
        metadata: api::Metadata {
            assignee: contributor_id,
            github_username: github_issue.assignee.map(|assignee| assignee.login),
            context: labels.get("Context").map(|x| x.to_owned()),
            difficulty: labels.get("Difficulty").map(|x| x.to_owned()),
            duration: labels.get("Duration").map(|x| x.to_owned()),
            technology: labels.get("Techno").map(|x| x.to_owned()),
            r#type: labels.get("Type").map(|x| x.to_owned()),
        },
    }
}

mod api {
    use serde::Serialize;
    use url::Url;

    #[derive(Serialize)]
    pub struct Project {
        pub id: String,
        pub title: String,
        pub description: Option<String>,
        pub github_link: Url,
        pub logo: Url,
        pub contributions: Vec<Contribution>,
    }

    #[derive(Serialize)]
    pub struct Contribution {
        pub id: String,
        pub title: String,
        pub description: String,
        pub github_link: Url,
        pub status: String,
        pub gate: u8,
        pub metadata: Metadata,
    }

    #[derive(Serialize)]
    pub struct Metadata {
        pub assignee: Option<String>,
        pub github_username: Option<String>,
        pub difficulty: Option<String>,
        pub technology: Option<String>,
        pub duration: Option<String>,
        pub context: Option<String>,
        pub r#type: Option<String>,
    }
}
