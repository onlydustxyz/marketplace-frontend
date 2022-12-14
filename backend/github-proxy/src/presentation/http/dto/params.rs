use std::{
	collections::HashMap,
	fmt::{Display, Formatter, Result},
};

use derive_more::*;

#[derive(Debug, From, FromForm)]
pub struct Params(HashMap<String, String>);

impl Display for Params {
	fn fmt(&self, f: &mut Formatter<'_>) -> Result {
		let params: Vec<String> =
			self.0.iter().map(|(key, value)| format!("{key}={value}")).collect();
		if !params.is_empty() {
			write!(f, "?{}", params.join("&"))?;
		}
		Ok(())
	}
}
