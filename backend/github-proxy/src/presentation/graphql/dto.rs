use juniper::GraphQLEnum;

#[derive(Default, GraphQLEnum)]
pub enum PullState {
	#[default]
	All,
	Open,
	Closed,
}
