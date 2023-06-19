use std::sync::Arc;

use domain::{AggregateRootRepository, Project};
use infrastructure::{
	amqp::{self},
	database::{ImmutableRepository, Repository},
	github, graphql,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard, OptionUserId, Role};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{
	domain::permissions::IntoPermission,
	infrastructure::{simple_storage, web3::ens},
	models::*,
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
#[instrument(skip_all, fields(user.ids = debug(&maybe_user_id), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	command_bus: &State<Arc<amqp::CommandPublisher<amqp::Bus>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<Arc<dyn Repository<ProjectDetails>>>,
	sponsor_repository: &State<Arc<dyn Repository<Sponsor>>>,
	project_sponsor_repository: &State<Arc<dyn ImmutableRepository<ProjectsSponsor>>>,
	pending_project_leader_invitations_repository: &State<
		Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
	>,
	ignored_github_issues_repository: &State<Arc<dyn ImmutableRepository<IgnoredGithubIssue>>>,
	user_payout_info_repository: &State<Arc<dyn Repository<UserPayoutInfo>>>,
	user_profile_info_repository: &State<UserProfileInfoRepository>,
	terms_and_conditions_acceptance_repository: &State<
		Arc<dyn Repository<TermsAndConditionsAcceptance>>,
	>,
	contact_informations_repository: &State<Arc<dyn ContactInformationsRepository>>,
	graphql: &State<Arc<graphql::Client>>,
	github: &State<Arc<github::Client>>,
	bus: &State<Arc<amqp::Bus>>,
	ens: &State<Arc<ens::Client>>,
	simple_storage: &State<Arc<simple_storage::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.to_permissions((*project_repository).clone()),
		maybe_user_id,
		(*command_bus).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*sponsor_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*ignored_github_issues_repository).clone(),
		(*user_payout_info_repository).clone(),
		(*user_profile_info_repository).clone(),
		(*contact_informations_repository).clone(),
		(*terms_and_conditions_acceptance_repository).clone(),
		(*graphql).clone(),
		(*github).clone(),
		(*ens).clone(),
		(*simple_storage).clone(),
		(*bus).clone(),
	);
	request.execute(schema, &context).await
}

#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(user.ids = debug(&maybe_user_id), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	role: Role,
	maybe_user_id: OptionUserId,
	request: GraphQLRequest,
	schema: &State<Schema>,
	command_bus: &State<Arc<amqp::CommandPublisher<amqp::Bus>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<Arc<dyn Repository<ProjectDetails>>>,
	sponsor_repository: &State<Arc<dyn Repository<Sponsor>>>,
	project_sponsor_repository: &State<Arc<dyn ImmutableRepository<ProjectsSponsor>>>,
	pending_project_leader_invitations_repository: &State<
		Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
	>,
	ignored_github_issues_repository: &State<Arc<dyn ImmutableRepository<IgnoredGithubIssue>>>,
	user_payout_info_repository: &State<Arc<dyn Repository<UserPayoutInfo>>>,
	user_profile_info_repository: &State<UserProfileInfoRepository>,
	terms_and_conditions_acceptance_repository: &State<
		Arc<dyn Repository<TermsAndConditionsAcceptance>>,
	>,
	contact_informations_repository: &State<Arc<dyn ContactInformationsRepository>>,
	graphql: &State<Arc<graphql::Client>>,
	github: &State<Arc<github::Client>>,
	bus: &State<Arc<amqp::Bus>>,
	ens: &State<Arc<ens::Client>>,
	simple_storage: &State<Arc<simple_storage::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.to_permissions((*project_repository).clone()),
		maybe_user_id,
		(*command_bus).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*sponsor_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*ignored_github_issues_repository).clone(),
		(*user_payout_info_repository).clone(),
		(*user_profile_info_repository).clone(),
		(*contact_informations_repository).clone(),
		(*terms_and_conditions_acceptance_repository).clone(),
		(*graphql).clone(),
		(*github).clone(),
		(*ens).clone(),
		(*simple_storage).clone(),
		(*bus).clone(),
	);
	request.execute(schema, &context).await
}
