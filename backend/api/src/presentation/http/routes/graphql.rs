use std::sync::Arc;

use domain::{AggregateRootRepository, Event, Project, Publisher};
use infrastructure::{amqp::UniqueMessage, github};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard, OptionUserId, Role};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{
	infrastructure::{
		database::{
			GithubRepoRepository, PendingProjectLeaderInvitationsRepository,
			ProjectDetailsRepository, ProjectGithubRepoRepository, ProjectSponsorRepository,
			UserInfoRepository,
		},
		web3::ens,
	},
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
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<ProjectDetailsRepository>,
	github_repo_repository: &State<GithubRepoRepository>,
	project_github_repo_repository: &State<ProjectGithubRepoRepository>,
	project_sponsor_repository: &State<ProjectSponsorRepository>,
	pending_project_leader_invitations_repository: &State<
		PendingProjectLeaderInvitationsRepository,
	>,
	user_info_repository: &State<UserInfoRepository>,
	github: &State<Arc<github::Client>>,
	ens: &State<Arc<ens::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*event_publisher).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*github_repo_repository).clone(),
		(*project_github_repo_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*user_info_repository).clone(),
		(*github).clone(),
		(*ens).clone(),
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
	event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
	project_repository: &State<AggregateRootRepository<Project>>,
	project_details_repository: &State<ProjectDetailsRepository>,
	github_repo_repository: &State<GithubRepoRepository>,
	project_github_repo_repository: &State<ProjectGithubRepoRepository>,
	project_sponsor_repository: &State<ProjectSponsorRepository>,
	pending_project_leader_invitations_repository: &State<
		PendingProjectLeaderInvitationsRepository,
	>,
	user_info_repository: &State<UserInfoRepository>,
	github: &State<Arc<github::Client>>,
	ens: &State<Arc<ens::Client>>,
) -> GraphQLResponse {
	let context = Context::new(
		role.into(),
		maybe_user_id,
		(*event_publisher).clone(),
		(*project_repository).clone(),
		(*project_details_repository).clone(),
		(*github_repo_repository).clone(),
		(*project_github_repo_repository).clone(),
		(*project_sponsor_repository).clone(),
		(*pending_project_leader_invitations_repository).clone(),
		(*user_info_repository).clone(),
		(*github).clone(),
		(*ens).clone(),
	);
	request.execute(schema, &context).await
}
