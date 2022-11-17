use derive_more::Into;
use rocket::request::FromParam;
use schemars::JsonSchema;
use serde::Deserialize;
use std::str::FromStr;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, Deserialize, JsonSchema, Into)]
pub struct UuidParam(Uuid);

impl<'a> FromParam<'a> for UuidParam {
	type Error = uuid::Error;

	fn from_param(param: &'a str) -> Result<Self, Self::Error> {
		Uuid::from_str(param).map(UuidParam)
	}
}
