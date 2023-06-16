use ::infrastructure::database::schema::*;
use diesel::Identifiable;
use domain::GithubUserId;
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Default,
	Clone,
	Identifiable,
	Insertable,
	AsChangeset,
	Queryable,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Model,
)]
pub struct GithubUser {
	pub id: GithubUserId,
	pub login: String,
	pub avatar_url: String,
	pub html_url: String,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub twitter: Option<String>,
	pub linkedin: Option<String>,
	pub telegram: Option<String>,
}

impl Identifiable for GithubUser {
	type Id = GithubUserId;

	fn id(self) -> Self::Id {
		self.id
	}
}
