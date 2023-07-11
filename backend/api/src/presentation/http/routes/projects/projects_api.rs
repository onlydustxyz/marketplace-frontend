use http_api_problem::HttpApiProblem;
use rocket::{
	data::{ByteUnit, Data, ToByteUnit},
	serde::json::Json,
	State,
};
use rusty_money::Money;
use serde::{Deserialize, Serialize};
use url::Url;
use uuid08::Uuid;

use common_domain::ProjectVisibility;

#[derive(Debug, Serialize)]
pub struct Response {
	// project_id: Uuid,
}

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Request {
	name: String,
	short_description: String,
	long_description: String,
	telegram_link: Option<Url>,
	logo_url: Option<Url>,
	initial_budget: Option<i32>,
	hiring: Option<bool>,
	rank: Option<i32>,
	visibility: Option<ProjectVisibility>,
}

#[post("/api/projects", data = "<request>", format = "application/json", )]
pub async fn create_project(
	request: Json<Request>
) -> Result<Json<Response>, HttpApiProblem> {
	println!("{}", request.name);
	// let project_id = context
	// 	.create_project_usecase
	// 	.create(
	// 		request.name.try_into()?,
	// 		request.short_description.try_into()?,
	// 		request.long_description.try_into()?,
	// 		request.telegram_link,
	// 		request.logo_url,
	// 		request.initial_budget.map(|initial_budget| {
	// 			Money::from_major(initial_budget as i64, rusty_money::crypto::USDC).into()
	// 		}),
	// 		request.hiring.unwrap_or_default(),
	// 		request.rank.unwrap_or_default(),
	// 		request.visibility.unwrap_or_default(),
	// 	)
	// 	.await?;
	// Ok(Json(Response { project_id }))
	Ok(Json(Response {}))
}
