mod dto;

use std::collections::HashMap;

use deathnote_contributions_feeder::database::connections::pg_connection::DbConn;
use deathnote_contributions_feeder::domain::*;
use deathnote_contributions_feeder::{database, github, starknet};

use futures::{
    future,
    stream::{self, StreamExt},
};
use http_api_problem::{HttpApiProblem, StatusCode};
use log::warn;
use rocket::{get, http::Status, post, serde::json::Json, State};
use rocket_okapi::openapi;
use url::Url;

use super::contributor_cache::ContributorCache;

#[openapi(tag = "Projects")]
#[post("/projects", format = "application/json", data = "<project>")]
pub async fn new_project(
    project: Json<dto::ProjectCreation<'_>>,
    connection: DbConn,
) -> Result<Status, Json<HttpApiProblem>> {
    let filter = ProjectFilter {
        owner: Some(String::from(project.owner)),
        name: Some(String::from(project.name)),
    };

    let database = database::API::new(connection);
    let github = github::API::new();

    let projects = github
        .fetch(filter)
        .await
        .map_err(|error| {
            HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                .title("Fetching projects failed")
                .detail(error.to_string())
        })?
        .collect::<Vec<_>>()
        .await;

    for project in projects {
        database.log(project).await.map_err(|error| {
            HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                .title("Saving projects to DB failed")
                .detail(error.to_string())
        })?;
    }

    Ok(Status::Accepted)
}

#[openapi(tag = "Projects")]
#[get("/projects")]
pub async fn list_projects(
    connection: DbConn,
    issue_cache: &State<github::IssueCache>,
    repo_cache: &State<github::RepoCache>,
    contributor_cache: &State<ContributorCache>,
) -> Result<Json<Vec<dto::Project>>, Json<HttpApiProblem>> {
    let database = database::API::new(connection);

    let results = database
        .list_projects_with_contributions()
        .map_err(|error| {
            HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                .title("Listing projects failed")
                .detail(error.to_string())
        })?;

    let projects = stream::iter(results)
        .filter_map(|project| build_project(project, issue_cache, repo_cache, contributor_cache))
        .collect::<Vec<_>>()
        .await;

    Ok(Json(projects))
}

async fn build_project(
    project: database::models::ProjectWithContributions,
    issue_cache: &github::IssueCache,
    repo_cache: &github::RepoCache,
    contributor_cache: &ContributorCache,
) -> Option<dto::Project> {
    let github_repository = repo_cache
        .get_or_insert(&project.id, || async {
            match github::API::new().repository_by_id(&project.id).await {
                Ok(repo) => Some(repo),
                Err(e) => {
                    warn!("Unable to fetch repository from GitHub: {}", e.to_string());
                    None
                }
            }
        })
        .await?;

    // Spawn concurent tasks
    // One for each contribution
    let build_contribution_tasks = project.contributions.into_iter().map(|contribution| {
        let cloned_issue_cache = issue_cache.clone();
        let cloned_contributor_cache = contributor_cache.clone();
        tokio::spawn(async move {
            build_contribution(contribution, &cloned_issue_cache, &cloned_contributor_cache).await
        })
    });

    // Merge all tasks into a single vector
    // Stop and return as soon as it fail to join one of the tasks
    let contributions = future::try_join_all(build_contribution_tasks)
        .await
        .ok()?
        .into_iter()
        .flatten()
        .collect();

    let project = dto::Project {
        id: project.id,
        title: project.name.clone(),
        description: github_repository.description,
        logo: github_repository.owner.unwrap().avatar_url,
        github_link: github_repository.html_url.unwrap_or_else(|| {
            Url::parse(&format!(
                "https://github.com/{}/{}",
                project.owner, project.name
            ))
            .unwrap()
        }),
        contributions,
    };

    Some(project)
}

async fn build_contribution(
    contribution: database::models::Contribution,
    issue_cache: &github::IssueCache,
    contributor_cache: &ContributorCache,
) -> Option<dto::Contribution> {
    let contributor = build_contributor(contributor_cache, contribution.author).await;

    let github_issue = issue_cache
        .get_or_insert(&contribution.id, || async {
            match github::API::new().issue(&contribution.id).await {
                Ok(issue) => Some(issue),
                Err(e) => {
                    warn!("Unable to fetch issue from GitHub: {}", e.to_string());
                    None
                }
            }
        })
        .await?;

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

    let contribution = dto::Contribution {
        id: contribution.id.clone(),
        title: github_issue.title,
        description: github_issue.body.unwrap_or_default(),
        github_link: github_issue.html_url,
        status: contribution.status.to_string(),
        gate: contribution.gate as u8,
        metadata: dto::Metadata {
            assignee: contributor
                .as_ref()
                .map(|c| format!("0x{}", c.id.to_string().trim_start_matches('0'))),
            github_username: contributor
                .as_ref()
                .and_then(|c| c.github_username.to_owned()),
            context: labels.get("Context").map(|x| x.to_owned()),
            difficulty: labels.get("Difficulty").map(|x| x.to_owned()),
            duration: labels.get("Duration").map(|x| x.to_owned()),
            technology: labels.get("Techno").map(|x| x.to_owned()),
            r#type: labels.get("Type").map(|x| x.to_owned()),
        },
    };

    Some(contribution)
}

async fn build_contributor(
    contributor_cache: &ContributorCache,
    author: String,
) -> Option<Contributor> {
    if author.is_empty() {
        return None;
    }

    let contributor_id: ContributorId = author.into();
    contributor_cache
        .get_or_insert(&contributor_id, || async {
            fetch_contributor(&contributor_id).await
        })
        .await
}

async fn fetch_contributor(contributor_id: &ContributorId) -> Option<Contributor> {
    let account = starknet::make_account_from_env();
    let starknet = starknet::API::new(&account);
    let mut contributor = starknet.get_user_information(contributor_id).await?;

    if let Some(github_handle) = &contributor.github_handle {
        let github_user = match github::API::new().user(github_handle).await {
            Ok(user) => Some(user),
            Err(e) => {
                warn!("Unable to fetch user from GitHub: {}", e.to_string());
                None
            }
        };

        contributor.github_username = github_user.map(|u| u.login);
    }

    Some(contributor)
}
