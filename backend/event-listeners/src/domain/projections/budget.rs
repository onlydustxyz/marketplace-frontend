use derive_more::Constructor;
use domain::{BudgetId, Entity};
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;
use uuid::Uuid;

use super::Projection;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Budget {
	id: Uuid,
	project_id: Option<Uuid>,
	initial_amount: Decimal,
	pub remaining_amount: Decimal,
}

impl Entity for Budget {
	type Id = BudgetId;
}

impl Projection for Budget {}
