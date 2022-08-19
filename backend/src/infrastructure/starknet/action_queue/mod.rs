#[cfg(test)]
mod tests;

use crate::domain::*;
use std::{cmp::min, collections::VecDeque};

pub struct ActionQueue(VecDeque<Action>);

impl ActionQueue {
	pub fn new() -> Self {
		Self(VecDeque::new())
	}

	pub fn push(&mut self, action: Action) {
		self.0.push_front(action)
	}

	pub fn pop_n(&mut self, amount: usize) -> Vec<Action> {
		let mut ret = Vec::with_capacity(min(self.0.len(), amount));
		for _ in 0..amount {
			if let Some(v) = self.0.pop_back() {
				ret.push(v);
			} else {
				break;
			};
		}

		ret
	}
}

impl Default for ActionQueue {
	fn default() -> Self {
		Self::new()
	}
}
