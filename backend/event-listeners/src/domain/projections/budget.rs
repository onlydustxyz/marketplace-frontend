use super::Projection;
use derive_more::Constructor;
use domain::Entity;
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Budget {
	id: Uuid,
	project_id: Option<Uuid>,
	initial_amount: Decimal,
	pub remaining_amount: Decimal,
}

impl Entity for Budget {
	type Id = Uuid;
}

impl Projection for Budget {}
