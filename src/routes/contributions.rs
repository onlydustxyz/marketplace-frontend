use std::sync::{Arc, RwLock};

use deathnote_contributions_feeder::domain::{Action, ContributionId, ProjectId};
use rocket::response::status;
use rocket::serde::{json::Json, Deserialize};
use rocket::State;

use crate::ActionQueue;

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
    _body: Json<Body>,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    let body = body.into_inner();

    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::CreateContribution {
            contribution_id: body.contribution_id.clone(),
            project_id: body.project_id.clone(),
            gate: 0,
        }),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(Some(())))
}
