use crate::graphql::{Context, Schema};
use domain::{
	AggregateRootRepository, Event, Payment, Project, Publisher, UniqueMessage, UserRepository,
	UuidGenerator,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};
use std::sync::Arc;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub async fn get_graphql_handler(
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	user_repository: &State<Arc<dyn UserRepository>>,
) -> GraphQLResponse {
	let context = Context::new(
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*project_repository).clone(),
		(*payment_repository).clone(),
		(*user_repository).clone(),
	);
	request.execute(schema, &context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post_graphql_handler(
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	user_repository: &State<Arc<dyn UserRepository>>,
) -> GraphQLResponse {
	let context = Context::new(
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*project_repository).clone(),
		(*payment_repository).clone(),
		(*user_repository).clone(),
	);
	request.execute(schema, &context).await
}
