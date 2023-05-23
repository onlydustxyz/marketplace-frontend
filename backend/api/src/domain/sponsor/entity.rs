/// Module for representing sponsors-related database schema
use ::infrastructure::database::schema::sponsors;

/// A struct representing a single sponsor
#[derive(
	Default,
	Debug,
	Clone,
	Getters,
	Setters,
	Dissolve,
	Insertable,
	AsChangeset,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	Constructor,
	PartialEq,
)]
#[table_name = "sponsors"]
#[setters(prefix = "with_")]
#[changeset_options(treat_none_as_null = "true")]
pub struct Sponsor {
    /// A unique identifier for the sponsor
    id: SponsorId,
    /// The name of the sponsor
    name: String,
    /// The URL of the sponsor's logo
    logo_url: String,
    /// The URL of the sponsor's website
    url: Option<String>,
}

impl domain::Entity for Sponsor {
	type Id = SponsorId;
}