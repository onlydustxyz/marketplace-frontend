use juniper::GraphQLEnum;

#[derive(Default, GraphQLEnum)]
pub enum PullState {
	#[default]
	All,
	Open,
	Closed,
}

pub trait AsStr {
	fn as_str(&self) -> &'static str;
}

impl AsStr for PullState {
	fn as_str(&self) -> &'static str {
		match self {
			PullState::All => "all",
			PullState::Open => "open",
			PullState::Closed => "closed",
		}
	}
}
