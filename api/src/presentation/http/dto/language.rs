use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Language {
	pub name: String,
	pub weight: i32,
}
