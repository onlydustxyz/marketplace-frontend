use std::sync::{Arc, RwLock};

use deathnote_contributions_feeder::domain::{Action, ContributionId, ContributorId, ProjectId};
use rocket::response::status;
use rocket::serde::{json::Json, Deserialize};
use rocket::State;

use crate::ActionQueue;

use super::{ApiKey, Failure};

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct CreateContributionBody {
    contribution_id: ContributionId,
    project_id: ProjectId,
    gate: u8,
}

#[post("/contribution", format = "application/json", data = "<body>")]
pub async fn create_contribution(
    _api_key: ApiKey,
    body: Json<CreateContributionBody>,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    let body = body.into_inner();

    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::CreateContribution {
            contribution_id: body.contribution_id,
            project_id: body.project_id,
            gate: body.gate,
        }),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(None))
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct AssignContributorBody {
    contributor_id: ContributorId,
}

#[post(
    "/contribution/<contribution_id>/contributor",
    format = "application/json",
    data = "<body>"
)]
pub async fn assign_contributor(
    _api_key: ApiKey,
    contribution_id: ContributionId,
    body: Json<AssignContributorBody>,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    let body = body.into_inner();

    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::AssignContributor {
            contribution_id,
            contributor_id: body.contributor_id,
        }),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(None))
}

#[post("/contribution/<contribution_id>/validate")]
pub async fn validate_contribution(
    _api_key: ApiKey,
    contribution_id: ContributionId,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::ValidateContribution { contribution_id }),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(None))
}

#[delete("/contribution/<contribution_id>/contributor")]
pub async fn unassign_contributor(
    _api_key: ApiKey,
    contribution_id: ContributionId,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::UnassignContributor { contribution_id }),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(None))
}
