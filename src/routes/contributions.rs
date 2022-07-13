use std::sync::{Arc, RwLock};

use crypto_bigint::U256;
use deathnote_contributions_feeder::domain::{Action, ContributionId, ProjectId};
use http_api_problem::{HttpApiProblem, StatusCode};
use log::info;
use rocket::http::Status;
use rocket::response::status;
use rocket::serde::{json::Json, Deserialize};
use rocket::State;
use rocket_okapi::{openapi, JsonSchema};

use crate::action_queue::ActionQueue;

use super::ApiKey;

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct CreateContributionBody {
    contribution_id: ContributionId,
    project_id: ProjectId,
    gate: u8,
}

#[openapi(tag = "Contributions")]
#[post("/contribution", format = "application/json", data = "<body>")]
pub async fn create_contribution(
    _api_key: ApiKey,
    body: Json<CreateContributionBody>,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<Status, Json<HttpApiProblem>> {
    let body = body.into_inner();

    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::CreateContribution {
            contribution_id: body.contribution_id,
            project_id: body.project_id,
            gate: body.gate,
        }),
        Err(error) => {
            return Err(Json(
                HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                    .title("Unable to add contribution to the queue")
                    .detail(error.to_string()),
            ))
        }
    }

    Ok(Status::Accepted)
}

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct AssignContributorBody {
    contributor_id: u128,
}

#[openapi(tag = "Contributions")]
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
) -> Result<status::Accepted<()>, Json<HttpApiProblem>> {
    let body = body.into_inner();
    info!("contributor_id={}", body.contributor_id);

    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::AssignContributor {
            contribution_id,
            contributor_id: deathnote_contributions_feeder::domain::ContributorId(U256::from_u128(
                body.contributor_id,
            )),
        }),
        Err(error) => {
            return Err(Json(
                HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                    .title("Unable to add assignation to the queue")
                    .detail(error.to_string()),
            ))
        }
    }

    Ok(status::Accepted(None))
}

#[openapi(tag = "Contributions")]
#[post("/contribution/<contribution_id>/validate")]
pub async fn validate_contribution(
    _api_key: ApiKey,
    contribution_id: ContributionId,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Json<HttpApiProblem>> {
    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::ValidateContribution { contribution_id }),
        Err(error) => {
            return Err(Json(
                HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                    .title("Unable to add contribution validation to the queue")
                    .detail(error.to_string()),
            ))
        }
    }

    Ok(status::Accepted(None))
}

#[openapi(tag = "Contributions")]
#[delete("/contribution/<contribution_id>/contributor")]
pub async fn unassign_contributor(
    _api_key: ApiKey,
    contribution_id: ContributionId,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Json<HttpApiProblem>> {
    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::UnassignContributor { contribution_id }),
        Err(error) => {
            return Err(Json(
                HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
                    .title("Unable to add unassignation to the queue")
                    .detail(error.to_string()),
            ))
        }
    }

    Ok(status::Accepted(None))
}
