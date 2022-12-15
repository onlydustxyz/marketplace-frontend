use derive_more::Constructor;
use domain::BudgetId;
use infrastructure::database::schema::budgets;
use rust_decimal::Decimal;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Budget {
	id: BudgetId,
	project_id: Option<Uuid>,
	initial_amount: Decimal,
	pub remaining_amount: Decimal,
}
