use std::sync::Arc;

use domain::{
	AggregateRootRepository, Budget, Event, Payment, Project, Publisher, UniqueMessage,
	UuidGenerator,
};
use infrastructure::github;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard, OptionUserId, Role};
use rocket::{response::content, State};

use crate::{
	infrastructure::database::{ProjectDetailsRepository, UserInfoRepository},
	presentation::graphql::{Context, Schema},
};

#[derive(Default)]
pub struct GraphqlApiKey;

impl ApiKey for GraphqlApiKey {
	fn name() -> &'static str {
		"graphql"
	}
}

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[allow(clippy::too_many_arguments)]
#[get("/graphql?<request>")]
pub async fn get_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<ProjectDetailsRepository>,
	user_info_repository: &State<UserInfoRepository>,
	github: &State<Arc<github::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*user_info_repository).clone(),
		(*github).clone(),
	);
	request.execute(schema, &context).await
}

#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	uuid_generator: &State<Arc<dyn UuidGenerator>>,
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	payment_repository: &State<AggregateRootRepository<Payment>>,
	budget_repository: &State<AggregateRootRepository<Budget>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<ProjectDetailsRepository>,
	user_info_repository: &State<UserInfoRepository>,
	github: &State<Arc<github::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*uuid_generator).clone(),
		(*event_publisher).clone(),
		(*payment_repository).clone(),
		(*budget_repository).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*user_info_repository).clone(),
		(*github).clone(),
	);
	request.execute(schema, &context).await
}
