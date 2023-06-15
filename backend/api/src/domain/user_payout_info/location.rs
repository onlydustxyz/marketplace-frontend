use anyhow::anyhow;
use diesel::{
	backend::Backend,
	deserialize::{FromSql, FromSqlRow},
	expression::AsExpression,
	pg::Pg,
	serialize::{Output, ToSql},
	sql_types::Jsonb,
};
use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

#[derive(
	Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject, AsExpression, FromSqlRow,
)]
#[diesel(sql_type = diesel::sql_types::Jsonb)]
pub struct Location {
	address: Option<String>,
	post_code: Option<String>,
	city: Option<String>,
	country: Option<String>,
}

impl ToSql<Jsonb, Pg> for Location
where
	serde_json::Value: ToSql<Jsonb, Pg>,
{
	fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> diesel::serialize::Result {
		let value = serde_json::to_value(self)?;
		<serde_json::Value as ToSql<Jsonb, Pg>>::to_sql(&value, &mut out.reborrow())
	}
}

impl<DB> FromSql<Jsonb, DB> for Location
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
