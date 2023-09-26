use std::{collections::HashSet, sync::Arc};

use anyhow::Result;
use domain::{Application, Budget, EventSourcable, EventStore, Identified, Payment, Project};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::ApiKey;
use rocket::State;

#[post("/events/checks")]
pub async fn check(
	_api_key: ApiKey,
	project_event_store: &State<Arc<dyn EventStore<Project>>>,
	budget_event_store: &State<Arc<dyn EventStore<Budget>>>,
	application_event_store: &State<Arc<dyn EventStore<Application>>>,
	payment_event_store: &State<Arc<dyn EventStore<Payment>>>,
) -> Result<(), HttpApiProblem> {
	check_events::<Project>(project_event_store).map_err(|e| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Project events are corrupted")
			.detail(e.to_string())
	})?;
	check_events::<Budget>(budget_event_store).map_err(|e| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Budget events are corrupted")
			.detail(e.to_string())
	})?;
	check_events::<Application>(application_event_store).map_err(|e| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Application events are corrupted")
			.detail(e.to_string())
	})?;
	check_events::<Payment>(payment_event_store).map_err(|e| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Payment events are corrupted")
			.detail(e.to_string())
	})?;

	Ok(())
}

fn check_events<A: EventSourcable>(event_store: &Arc<dyn EventStore<A>>) -> Result<()> {
	let event_ids: HashSet<A::Id> =
		event_store.list()?.iter().map(|event| event.id().clone()).collect();

	event_ids.iter().try_for_each(|id| -> Result<()> {
		let events = event_store.list_by_id(id)?;
		A::from_events(&events);
		Ok(())
	})
}
