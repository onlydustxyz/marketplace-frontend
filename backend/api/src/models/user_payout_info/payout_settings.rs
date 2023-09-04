use anyhow::anyhow;
use diesel::{
	backend::Backend,
	deserialize::{FromSql, FromSqlRow},
	expression::AsExpression,
	pg::Pg,
	serialize::{Output, ToSql},
	sql_types::Jsonb,
};
use domain::{blockchain::ethereum, Iban};
use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromSqlRow, PartialEq, Eq)]
#[diesel(sql_type = diesel::sql_types::Jsonb)]
pub enum PayoutSettings {
	WireTransfer(BankAddress),
	EthTransfer(ethereum::Identity),
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject, PartialEq, Eq)]
#[allow(non_snake_case)]
pub struct BankAddress {
	BIC: String,
	IBAN: Iban,
}

impl ToSql<Jsonb, Pg> for PayoutSettings
where
	serde_json::Value: ToSql<Jsonb, Pg>,
{
	fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> diesel::serialize::Result {
		let value = serde_json::to_value(self)?;
		<serde_json::Value as ToSql<Jsonb, Pg>>::to_sql(&value, &mut out.reborrow())
	}
}

impl<DB> FromSql<Jsonb, DB> for PayoutSettings
where
	DB: Backend,
	serde_json::Value: FromSql<Jsonb, DB>,
{
	fn from_nullable_sql(
		bytes: Option<<DB as Backend>::RawValue<'_>>,
	) -> diesel::deserialize::Result<Self> {
		let value = serde_json::from_value(serde_json::Value::from_nullable_sql(bytes)?)
			.map_err(|e| anyhow!(e))?;
		Ok(value)
	}

	fn from_sql(bytes: <DB as Backend>::RawValue<'_>) -> diesel::deserialize::Result<Self> {
		let value =
			serde_json::from_value(serde_json::Value::from_sql(bytes)?).map_err(|e| anyhow!(e))?;
		Ok(value)
	}
}
