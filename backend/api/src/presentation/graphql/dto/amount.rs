use anyhow::anyhow;
use juniper::GraphQLScalarValue;
use rust_decimal::{prelude::ToPrimitive, Decimal};

#[derive(Debug, Default, GraphQLScalarValue)]
pub struct Amount(f64);

impl TryFrom<&Decimal> for Amount {
	type Error = anyhow::Error;

	fn try_from(value: &Decimal) -> Result<Self, Self::Error> {
		Ok(Self(value.to_f64().ok_or_else(|| {
			anyhow!("Invalid amount: {}", value.to_string())
		})?))
	}
}
