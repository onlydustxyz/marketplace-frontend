use derive_more::Constructor;
use juniper::{GraphQLEnum, GraphQLObject};

#[derive(Constructor, GraphQLObject)]
pub struct File {
	encoding: Encoding,
	content: String,
}

#[derive(GraphQLEnum)]
pub enum Encoding {
	Base64,
}
