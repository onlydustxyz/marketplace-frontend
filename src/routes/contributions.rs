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
    _contribution_id: ContributionId,
    _project_id: ProjectId,
}

#[post("/contribution", format = "application/json", data = "<_body>")]
pub async fn create_contribution(
    _body: Json<Body>,
    queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, Failure> {
    match queue.write() {
        Ok(mut queue) => queue.push_front(Action::AddContribution {
            contribution_id: _body._contribution_id.clone(),
            project_id: _body._project_id.clone(),
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
