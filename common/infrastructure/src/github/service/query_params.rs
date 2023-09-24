use octocrab::params::{pulls::Sort, Direction};
use serde::Serialize;

#[derive(Debug, Default, Clone, Copy, Serialize)]
#[serde(rename_all = "snake_case")]
pub struct QueryParams {
	direction: Option<Direction>,
	page: Option<u8>,
	per_page: Option<u8>,
	sort: Option<Sort>,
	state: Option<State>,
}

impl QueryParams {
	pub fn direction(self, direction: Direction) -> Self {
		Self {
			direction: Some(direction),
			..self
		}
	}

	pub fn page(self, page: u8) -> Self {
		Self {
			page: Some(page),
			..self
		}
	}

	pub fn per_page(self, per_page: u8) -> Self {
		Self {
			per_page: Some(per_page),
			..self
		}
	}

	pub fn sort(self, sort: Sort) -> Self {
		Self {
			sort: Some(sort),
			..self
		}
	}

	pub fn state(self, state: State) -> Self {
		Self {
			state: Some(state),
			..self
		}
	}
}

impl QueryParams {
	pub fn to_query_string(self) -> Result<String, serde_qs::Error> {
		serde_qs::to_string(&self)
	}
}

#[derive(Debug, Clone, Copy, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum State {
	All,
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn all_filters() {
		let query_params = QueryParams::default()
			.direction(Direction::Ascending)
			.page(2)
			.per_page(10)
			.sort(Sort::Updated)
			.state(State::All);

		assert_eq!(
			serde_qs::to_string(&query_params).unwrap(),
			"direction=asc&page=2&per_page=10&sort=updated&state=all"
		);
	}

	#[test]
	fn no_filter() {
		let query_params: QueryParams = QueryParams::default();
		assert_eq!(serde_qs::to_string(&query_params).unwrap(), "");
	}
}
