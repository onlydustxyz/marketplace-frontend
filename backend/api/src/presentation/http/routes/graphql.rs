use std::sync::Arc;

use domain::{AggregateRepository, Event, Payment, Project, Publisher};
use infrastructure::{
	database::{ImmutableRepository, Repository},
	github,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{
	domain::{permissions::IntoPermission, ImageStoreService},
	infrastructure::web3::ens,
	models::*,
	presentation::graphql::{Context, Schema},
};

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[allow(clippy::too_many_arguments)]
#[get("/graphql?<request>")]
#[instrument(skip_all, fields(user.ids = debug(&claims), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
	_api_key: ApiKey,
	role: Role,
	claims: Option<Claims>,
	request: GraphQLRequest,
	schema: &State<Schema>,
	project_repository: &State<AggregateRepository<Project>>,
	payment_repository: &State<AggregateRepository<Payment>>,
	project_details_repository: &State<Arc<dyn Repository<ProjectDetails>>>,
	project_sponsor_repository: &State<Arc<dyn ImmutableRepository<ProjectsSponsor>>>,
	pending_project_leader_invitations_repository: &State<
		Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
	>,
	user_profile_info_repository: &State<Arc<dyn UserProfileInfoRepository>>,
	onboarding_repository: &State<Arc<dyn Repository<Onboarding>>>,
	contact_informations_repository: &State<Arc<dyn ContactInformationsRepository>>,
	github_api_client: &State<Arc<github::Client>>,
	bus: &State<Arc<dyn Publisher<Event>>>,
	ens: &State<Arc<ens::Client>>,
	simple_storage: &State<Arc<dyn ImageStoreService>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.to_permissions((*payment_repository).clone()),
		claims,
		(*project_repository).clone(),
		(*payment_repository).clone(),
		(*project_details_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*user_profile_info_repository).clone(),
		(*contact_informations_repository).clone(),
		(*onboarding_repository).clone(),
		(*github_api_client).clone(),
		(*ens).clone(),
		(*simple_storage).clone(),
		(*bus).clone(),
	);
	request.execute(schema, &context).await
}

#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(user.ids = debug(&claims), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKey,
	role: Role,
	claims: Option<Claims>,
	request: GraphQLRequest,
	schema: &State<Schema>,
	project_repository: &State<AggregateRepository<Project>>,
	payment_repository: &State<AggregateRepository<Payment>>,
	project_details_repository: &State<Arc<dyn Repository<ProjectDetails>>>,
	project_sponsor_repository: &State<Arc<dyn ImmutableRepository<ProjectsSponsor>>>,
	pending_project_leader_invitations_repository: &State<
		Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
	>,
	user_profile_info_repository: &State<Arc<dyn UserProfileInfoRepository>>,
	onboarding_repository: &State<Arc<dyn Repository<Onboarding>>>,
	contact_informations_repository: &State<Arc<dyn ContactInformationsRepository>>,
	github_api_client: &State<Arc<github::Client>>,
	bus: &State<Arc<dyn Publisher<Event>>>,
	ens: &State<Arc<ens::Client>>,
	simple_storage: &State<Arc<dyn ImageStoreService>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.to_permissions((*payment_repository).clone()),
		claims,
		(*project_repository).clone(),
		(*payment_repository).clone(),
		(*project_details_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*user_profile_info_repository).clone(),
		(*contact_informations_repository).clone(),
		(*onboarding_repository).clone(),
		(*github_api_client).clone(),
		(*ens).clone(),
		(*simple_storage).clone(),
		(*bus).clone(),
	);
	request.execute(schema, &context).await
}
