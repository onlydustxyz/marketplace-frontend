use std::sync::Arc;

use chrono::Utc;
use http_api_problem::HttpApiProblem;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use event_store::{bus::QUEUE_NAME, Event as StorableEvent, Event, EventOrigin};
use marketplace_domain::{Destination, ProjectEvent, Publisher, UuidGenerator};
use serde_json::Value;

use super::{to_http_api_problem::ToHttpApiProblem, uuid::UuidParam};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct Body {
	recipient_id: uuid::Uuid,
	requestor_id: uuid::Uuid,
	amount_in_usd: u32,
	reason: Value,
}

#[openapi(tag = "Project")]
#[post(
	"/projects/<project_id>/payment-request",
	format = "application/json",
	data = "<body>"
)]
pub async fn request_payment(
	project_id: UuidParam,
	body: Json<Body>,
	event_publisher: &State<Arc<dyn Publisher<Event>>>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
) -> Result<status::Accepted<String>, HttpApiProblem> {
	let body = body.into_inner();
	let payment_request_id = uuid_generator.new_uuid();
	let project_id: uuid::Uuid = project_id.into();

	let storable_event = StorableEvent {
		event: ProjectEvent::PaymentRequested {
			id: payment_request_id.into(),
			project_id: project_id.into(),
			requestor_id: body.requestor_id.into(),
			recipient_id: body.recipient_id.into(),
			amount_in_usd: body.amount_in_usd,
			reason: body.reason,
		}
		.into(),
		deduplication_id: uuid_generator.new_uuid().to_string(),
		timestamp: Utc::now().naive_utc(),
		metadata: serde_json::Value::default(),
		origin: EventOrigin::BACKEND,
	};

	event_publisher
		.publish(
			Destination::Queue(String::from(QUEUE_NAME)),
			&storable_event,
		)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(Some(payment_request_id.to_string())))
}
