use crate::{
	domain::{ProjectDetails, UserInfo},
	presentation::graphql::{Context, Schema},
};
use domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Publisher, UniqueMessage,
	UuidGenerator,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, OptionUserId, Role};
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
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	project_details_repository: &State<Arc<dyn EntityRepository<ProjectDetails>>>,
	user_info_repository: &State<Arc<dyn EntityRepository<UserInfo>>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*project_details_repository).clone(),
		(*user_info_repository).clone(),
	);
	request.execute(schema, &context).await
}

#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
pub async fn post_graphql_handler(
	_api_key: ApiKey,
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	project_details_repository: &State<Arc<dyn EntityRepository<ProjectDetails>>>,
	user_info_repository: &State<Arc<dyn EntityRepository<UserInfo>>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*project_details_repository).clone(),
		(*user_info_repository).clone(),
	);
	request.execute(schema, &context).await
}
