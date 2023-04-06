use juniper::{GraphQLEnum, GraphQLInputObject};

#[derive(Debug, Default, Clone, Copy, GraphQLInputObject)]
pub struct Filters {
	pub state: Option<State>,
}

#[derive(Debug, Clone, Copy, GraphQLEnum)]
pub enum State {
	Open,
	Closed,
	Merged,
	All,
}
