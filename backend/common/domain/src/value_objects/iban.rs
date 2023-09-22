use std::fmt::Display;

use derive_more::{From, FromStr, Into};
use iban::IbanLike;
use serde_with::{DeserializeFromStr, SerializeDisplay};

#[derive(
	Debug, Clone, PartialEq, Eq, From, Into, FromStr, SerializeDisplay, DeserializeFromStr,
)]
pub struct Iban(iban::Iban);

impl Display for Iban {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.0.electronic_str())
	}
}
