use diesel_derive_enum::DbEnum;
use domain::{currencies, ParseCurrencyError};
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::Currency"]
pub enum Currency {
	Usd,
	Eth,
	Op,
	Apt,
	Stark,
}

impl TryFrom<&'static domain::Currency> for Currency {
	type Error = ParseCurrencyError;

	fn try_from(currency: &'static domain::Currency) -> Result<Self, Self::Error> {
		match currency {
			currencies::USD => Ok(Self::Usd),
			currencies::ETH => Ok(Self::Eth),
			currencies::OPTIMISM => Ok(Self::Op),
			currencies::APTOS => Ok(Self::Apt),
			currencies::STARK => Ok(Self::Stark),
			_ => Err(ParseCurrencyError::NotSupported),
		}
	}
}
