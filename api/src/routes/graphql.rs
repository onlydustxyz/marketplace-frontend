use super::User;
use crate::{
	domain::ProjectDetails,
	graphql::{Context, Schema},
	routes::api_key::ApiKey,
};
use domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Publisher, UniqueMessage,
	UserRepository, UuidGenerator,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};
use std::sync::Arc;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[allow(clippy::too_many_arguments)]
#[get("/graphql?<request>")]
pub async fn get_graphql_handler(
	_api_key: ApiKey,
	user: User,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	user_repository: &State<Arc<dyn UserRepository>>,
	project_details_repository: &State<Arc<dyn EntityRepository<ProjectDetails>>>,
) -> GraphQLResponse {
	let context = Context::new(
		user.into(),
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*user_repository).clone(),
		(*project_details_repository).clone(),
	);
	request.execute(schema, &context).await
}

#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
pub async fn post_graphql_handler(
	_api_key: ApiKey,
	user: User,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	user_repository: &State<Arc<dyn UserRepository>>,
	project_details_repository: &State<Arc<dyn EntityRepository<ProjectDetails>>>,
) -> GraphQLResponse {
	let context = Context::new(
		user.into(),
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*user_repository).clone(),
		(*project_details_repository).clone(),
	);
	request.execute(schema, &context).await
}
