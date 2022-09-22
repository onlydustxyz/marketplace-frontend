use std::convert::{TryFrom, TryInto};

use http_api_problem::HttpApiProblem;
use marketplace_core::application::AssociateGithubAccountUsecase;
use marketplace_domain::{HexPrefixedString, ParseHexPrefixedStringError};
use marketplace_infrastructure::starknet_account_verifier::{
	HexFieldElement, HexFieldElementError, StarknetSignature, StarknetSignedData,
};
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
};

#[derive(Deserialize, Debug, Clone, Eq, PartialEq, Hash, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct Signature {
	pub r: HexPrefixedStringDto,
	pub s: HexPrefixedStringDto,
}

impl TryFrom<Signature> for StarknetSignature {
	type Error = HexFieldElementError;

	fn try_from(value: Signature) -> Result<Self, Self::Error> {
		let r: HexFieldElement = HexPrefixedString::from(value.r).try_into()?;
		let s: HexFieldElement = HexPrefixedString::from(value.s).try_into()?;

		Ok(StarknetSignature {
			r: r.into(),
			s: s.into(),
		})
	}
}

#[derive(Deserialize, Debug, Clone, Eq, PartialEq, Hash, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct SignedData {
	pub hash: HexPrefixedStringDto,
	pub signature: Signature,
}

impl TryFrom<SignedData> for StarknetSignedData {
	type Error = HexFieldElementError;

	fn try_from(value: SignedData) -> Result<Self, Self::Error> {
		let hash: HexFieldElement = HexPrefixedString::from(value.hash).try_into()?;

		Ok(StarknetSignedData {
			hash: hash.into(),
			signature: value.signature.try_into()?,
		})
	}
}

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct GithubAssociationRequest {
	pub authorization_code: String,
	pub signed_data: SignedData,
}

#[openapi(tag = "Contributors")]
#[put(
	"/contributors/<contributor_account>/github",
	format = "application/json",
	data = "<body>"
)]
pub async fn associate_github_account(
	contributor_account: String,
	body: Json<GithubAssociationRequest>,
	usecase: &State<Box<dyn AssociateGithubAccountUsecase<StarknetSignedData>>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let contributor_account = contributor_account
		.parse()
		.map_err(|e: ParseHexPrefixedStringError| e.to_http_api_problem())?;

	let body = body.into_inner();
	let signed_data = body
		.signed_data
		.try_into()
		.map_err(|e: HexFieldElementError| e.to_http_api_problem())?;

	usecase
		.associate_github_account(body.authorization_code, contributor_account, signed_data)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
