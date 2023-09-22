use rusty_money::Money;

use crate::Currency;

pub type Amount = Money<'static, Currency>;

pub mod serde {
	use ::serde::{Deserialize, Deserializer, Serialize, Serializer};
	use rust_decimal::Decimal;

	use super::*;

	#[derive(Debug, Serialize, Deserialize)]
	struct Serializable {
		amount: Decimal,
		currency: &'static Currency,
	}

	impl From<&Amount> for Serializable {
		fn from(value: &Amount) -> Self {
			Self {
				amount: *value.amount(),
				currency: value.currency(),
			}
		}
	}

	impl From<Serializable> for Amount {
		fn from(value: Serializable) -> Self {
			Self::from_decimal(value.amount, value.currency)
		}
	}

	pub fn serialize<S>(value: &Amount, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: Serializer,
	{
		Serializable::from(value).serialize(serializer)
	}

	pub fn deserialize<'de, D>(deserializer: D) -> Result<Amount, D::Error>
	where
		D: Deserializer<'de>,
	{
		Ok(Serializable::deserialize(deserializer)?.into())
	}
}
