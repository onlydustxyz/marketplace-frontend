use super::Projection;
use domain::Entity;
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, new)]
pub struct Budget {
	id: Uuid,
	project_id: Option<Uuid>,
	initial_amount: Decimal,
	remaining_amount: Decimal,
}

impl Entity for Budget {
	type Id = Uuid;
}

impl Projection for Budget {}
