use super::Project;
use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize, Clone)]
#[belongs_to(Project)]
#[serde(crate = "rocket::serde")]
pub struct Contribution {
	pub id: String,
	pub project_id: String,
	pub status: String,
	pub transaction_hash: Option<String>,
	pub contributor_id: String,
	pub gate: i16,
	pub title: Option<String>,
	pub description: Option<String>,
	pub external_link: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub type_: Option<String>,
	pub validator: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct AssignContributionForm {
	pub id: String,
	pub status: String,
	pub contributor_id: String,
	pub transaction_hash: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct ValidateContributionForm {
	pub id: String,
	pub status: String,
	pub transaction_hash: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct ContributionContractUpdateForm {
	pub id: String,
	pub transaction_hash: String,
}

#[derive(Insertable)]
#[table_name = "contributions"]
pub struct NewContribution {
	pub id: String,
	pub project_id: String,
	pub status: String,
	pub contributor_id: String,
	pub gate: i16,
	pub transaction_hash: String,
	pub title: Option<String>,
	pub description: Option<String>,
	pub external_link: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub type_: Option<String>,
	pub validator: String,
}
