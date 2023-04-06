#[derive(Debug, Default, Clone, Copy)]
pub struct Filters {
	pub state: Option<State>,
}

#[derive(Debug, Clone, Copy)]
pub enum State {
	Open,
	Closed,
	All,
}
