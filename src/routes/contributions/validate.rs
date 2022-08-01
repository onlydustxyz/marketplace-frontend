use std::sync::{Arc, RwLock};

use deathnote_contributions_feeder::{
	domain::{Action, ContributionOnChainId},
	infrastructure::starknet::action_queue::ActionQueue,
};
use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::api_key::ApiKey;

#[openapi(tag = "Contributions")]
#[post("/contributions/<contribution_id>/validate")]
pub async fn validate_contribution(
	_api_key: ApiKey,
	contribution_id: ContributionOnChainId,
	queue: &State<Arc<RwLock<ActionQueue>>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	match queue.write() {
		Ok(mut queue) => queue.push(Action::ValidateContribution { contribution_id }),
		Err(error) =>
			return Err(HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title("Unable to add contribution validation to the queue")
				.detail(error.to_string())),
	}

	Ok(status::Accepted(None))
}
