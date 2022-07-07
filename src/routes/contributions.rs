use std::collections::VecDeque;
use std::sync::{Arc, RwLock};

use deathnote_contributions_feeder::domain::{ContributionId, ProjectId};
use rocket::response::status;
use rocket::serde::{json::Json, Deserialize};
use rocket::State;

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
    queue: &State<Arc<RwLock<VecDeque<String>>>>,
) -> Result<status::Accepted<()>, Failure> {
    match queue.write() {
        Ok(mut queue) => queue.push_front("value".to_string()),
        Err(_) => {
            return Err(Failure::InternalServerError(
                "queue is busy, try again later".to_string(),
            ))
        }
    }

    Ok(status::Accepted(Some(())))
}
