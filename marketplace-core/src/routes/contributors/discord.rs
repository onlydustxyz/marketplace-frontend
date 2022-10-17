use crate::{
	routes::{hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem},
	RegisterDiscordHandleUsecase,
};
use http_api_problem::HttpApiProblem;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct DiscordRegistrationRequest {
	pub discord_handle: String,
}

#[openapi(tag = "Contributors")]
#[put(
	"/contributors/<contributor_account>/discord",
	format = "application/json",
	data = "<body>"
)]
pub async fn register_discord_handle(
	contributor_account: HexPrefixedStringDto,
	body: Json<DiscordRegistrationRequest>,
	usecase: &State<Box<dyn RegisterDiscordHandleUsecase>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let contributor_account = contributor_account.into();

	let body = body.into_inner();

	usecase
		.register_discord_handle(contributor_account, body.discord_handle)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
