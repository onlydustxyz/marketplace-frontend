use super::Projection;
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, AsChangeset, new)]
pub struct Budget {
	id: Uuid,
	project_id: Uuid,
	initial_amount: Decimal,
	remaining_amount: Decimal,
}

impl Projection for Budget {
	type Id = Uuid;
}
