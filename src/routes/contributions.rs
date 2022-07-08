use std::collections::VecDeque;
use std::sync::{Arc, RwLock};

use deathnote_contributions_feeder::domain::{Action, ContributionId, ProjectId};
use rocket::response::status;
use rocket::serde::{json::Json, Deserialize};
use rocket::State;

use super::Failure;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Body {
    contribution_id: ContributionId,
    project_id: ProjectId,
    gate: u8,
}

#[post("/contribution", format = "application/json", data = "<body>")]
pub async fn create_contribution(
    body: Json<Body>,
    queue: &State<Arc<RwLock<VecDeque<Action>>>>,
) -> Result<status::Accepted<()>, Failure> {
    let body = body.into_inner();

    let create_contribution_action = Action::CreateContribution {
        contribution_id: body.contribution_id,
        project_id: body.project_id,
        gate: body.gate,
    };

    match queue.write() {
        Ok(mut queue) => queue.push_front(create_contribution_action),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(Some(())))
}
